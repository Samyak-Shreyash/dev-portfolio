// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import { cookies } from 'next/headers';

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const JWT_SECRET = process.env.JWT_SECRET || 'cache';
const TOKEN_EXPIRY = 60 * 60; // 1 hour

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = userSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid input' },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const { db } = await connectToDatabase();

    const user = await db.collection('userOne').findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Incorrect email or password' },
        { status: 401 }
      );
    }
    
    const isValid = await argon2.verify( await argon2.hash(password) , user.password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Incorrect email or password' },
        { status: 402 }
      );
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    // Set HTTP-only cookie
    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: TOKEN_EXPIRY,
    });

    return NextResponse.json({ success: true, message: 'Login successful'}, {status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
