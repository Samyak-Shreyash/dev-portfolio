import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { createHash } from 'crypto';

export const SESSION_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

// No fallback secret: a guessable default would let anyone forge an admin session
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be set to at least 32 characters');
  }
  return secret;
}

// Single admin user: the session only needs to prove it was issued by us
export function signSession() {
  return jwt.sign({ sub: 'admin' }, getSecret(), { algorithm: 'HS256', expiresIn: SESSION_MAX_AGE });
}

export async function isAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;

  try {
    return (jwt.verify(token, getSecret(), { algorithms: ['HS256'] }) as jwt.JwtPayload).sub === 'admin';
  } catch {
    return false;
  }
}

// Salted hash of the client IP, so rate limits work without storing raw IPs
export function hashIp(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  return createHash('sha256').update(ip + (process.env.MONGODB_URI ?? '')).digest('hex');
}
