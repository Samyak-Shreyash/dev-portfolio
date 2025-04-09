import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'cache';

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}
