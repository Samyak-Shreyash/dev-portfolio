import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import argon2 from 'argon2';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { LoginAttemptDBService } from '@/lib/mongodb';
import { describeAuthConfig, hashIp, SESSION_COOKIE, SESSION_MAX_AGE, signSession } from '@/lib/auth';

const loginSchema = z.object({
  password: z.string().min(1).max(200),
});

const MAX_FAILED = 5;
const WINDOW_MS = 15 * 60 * 1000;
const INVALID = { success: false, message: 'Incorrect password' };

export async function POST(req: NextRequest) {
  // Short id ties together the log lines of one attempt. Never log the password, hash or secret.
  const id = randomUUID().slice(0, 8);
  const log = (step: string, details?: object) => console.log(`[login ${id}] ${step}${details ? ' ' + JSON.stringify(details) : ''}`);
  let step = 'start';

  try {
    log('start', describeAuthConfig());

    step = 'read config';
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!passwordHash) {
      throw new Error('ADMIN_PASSWORD_HASH is not set in this environment (check Vercel env vars for this target, then redeploy)');
    }

    step = 'parse body';
    const result = loginSchema.safeParse(await req.json().catch(() => null));
    if (!result.success) {
      log('rejected: invalid body');
      return NextResponse.json(INVALID, { status: 401 });
    }
    const { password } = result.data;

    step = 'rate limit check';
    const ipHash = hashIp(req);
    const recentFailures = await LoginAttemptDBService.countRecentFailures(ipHash, new Date(Date.now() - WINDOW_MS));
    log('rate limit', { recentFailures, max: MAX_FAILED });
    if (recentFailures >= MAX_FAILED) {
      log('rejected: rate limited');
      return NextResponse.json({ success: false, message: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    step = 'verify password';
    // verify(storedHash, plainPassword); a malformed hash throws, which counts as a failure
    const isValid = await argon2.verify(passwordHash, password).catch((err: Error) => {
      log('verify threw: ADMIN_PASSWORD_HASH is not a valid argon2 hash', { error: err.message });
      return false;
    });
    log('password checked', { match: isValid });

    if (!isValid) {
      step = 'record failure';
      await LoginAttemptDBService.recordFailure(ipHash);
      return NextResponse.json(INVALID, { status: 401 });
    }

    step = 'sign session';
    const token = signSession();

    step = 'set cookie';
    (await cookies()).set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    });
    log('success');
    return NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
  } catch (err) {
    console.error(`[login ${id}] failed at step "${step}": ${err instanceof Error ? err.message : String(err)} ${JSON.stringify(describeAuthConfig())}`);
    return NextResponse.json({ success: false, message: 'Server error', ref: id }, { status: 500 });
  }
}

// Logout
export async function DELETE() {
  (await cookies()).delete(SESSION_COOKIE);
  return NextResponse.json({ success: true });
}
