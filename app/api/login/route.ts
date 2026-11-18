import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { LoginAttemptDBService } from '@/lib/mongodb';
import { hashIp, SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifyLoginProof } from '@/lib/auth';

const loginSchema = z.object({
  challenge: z.string().min(1).max(1000),
  proof: z.string().min(1).max(100),
});

if (!process.env.ADMIN_LOGIN_VERIFIER) {
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
    const result = loginSchema.safeParse(await req.json().catch(() => null));
    if (!result.success) {
      return NextResponse.json(INVALID, { status: 401 });
    }
    const { challenge, proof } = result.data;

    const ipHash = hashIp(req);
    if (await LoginAttemptDBService.countRecentFailures(ipHash, new Date(Date.now() - WINDOW_MS)) >= MAX_FAILED) {
      return NextResponse.json({ success: false, message: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    // Challenges are single use, so a captured proof cannot be replayed
    const verified = verifyLoginProof(challenge, proof);
    const isValid = verified && await LoginAttemptDBService.consumeChallenge(verified.nonce, verified.expiresAt);

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
