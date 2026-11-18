import { NextResponse } from 'next/server';
import { createLoginChallenge } from '@/lib/auth';

export async function POST() {
  try {
    return NextResponse.json(createLoginChallenge(), { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('Login challenge error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
