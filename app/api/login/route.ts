import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import argon2 from 'argon2';
import { cookies } from 'next/headers';
import { LoginAttemptDBService } from '@/lib/mongodb';
import { hashIp, SESSION_COOKIE, SESSION_MAX_AGE, signSession } from '@/lib/auth';

const loginSchema = z.object({
  password: z.string().min(1).max(200),
});

if (!process.env.ADMIN_PASSWORD_HASH) {
  throw new Error("Please Verify your Password Storage")
}

if (!process.env.JWT_SECRET) {
  throw new Error("Please Verify your JWT Environment")
}

const MAX_FAILED = 5;
const WINDOW_MS = 15 * 60 * 1000;
const INVALID = { success: false, message: 'Incorrect password' };

export async function POST(req: NextRequest) {
  try {
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!passwordHash) {
      throw new Error('ADMIN_PASSWORD_HASH is not set');
    }

    const result = loginSchema.safeParse(await req.json().catch(() => null));
    if (!result.success) {
      return NextResponse.json(INVALID, { status: 401 });
    }
    const { password } = result.data;

    const ipHash = hashIp(req);
    if (await LoginAttemptDBService.countRecentFailures(ipHash, new Date(Date.now() - WINDOW_MS)) >= MAX_FAILED) {
      return NextResponse.json({ success: false, message: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    // verify(storedHash, plainPassword); a malformed hash throws, which counts as a failure
    const isValid = await argon2.verify(passwordHash, password).catch(() => false);

    if (!isValid) {
      await LoginAttemptDBService.recordFailure(ipHash);
      return NextResponse.json(INVALID, { status: 401 });
    }

    (await cookies()).set(SESSION_COOKIE, signSession(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    });
    return NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Logout
export async function DELETE() {
  (await cookies()).delete(SESSION_COOKIE);
  return NextResponse.json({ success: true });
}
