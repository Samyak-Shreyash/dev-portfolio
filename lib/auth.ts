import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { createHash } from 'crypto';

export const SESSION_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours
const MIN_SECRET_LENGTH = 32;

// No fallback secret: a guessable default would let anyone forge an admin session
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in this environment (check Vercel env vars for this target, then redeploy)');
  }
  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`JWT_SECRET is too short: ${secret.length} characters, need at least ${MIN_SECRET_LENGTH}`);
  }
  return secret;
}

// Safe-to-log facts about the auth env vars: presence, length and shape only, never the values
export function describeAuthConfig() {
  const secret = process.env.JWT_SECRET;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  return {
    jwtSecret: secret === undefined ? 'missing' : `length ${secret.length}${secret !== secret.trim() ? ' (has leading/trailing whitespace)' : ''}`,
    passwordHash: hash === undefined ? 'missing' : `length ${hash.length}, ${hash.startsWith('$argon2') ? 'argon2 format' : 'NOT argon2 format'}${hash !== hash.trim() ? ', has leading/trailing whitespace' : ''}`,
    vercelEnv: process.env.VERCEL_ENV ?? 'unknown',
  };
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
  } catch (err) {
    // Expired/forged tokens are expected; a missing or short secret is a config error worth seeing
    if (err instanceof Error && err.message.startsWith('JWT_SECRET')) console.error('[auth]', err.message);
    return false;
  }
}

// Salted hash of the client IP, so rate limits work without storing raw IPs
export function hashIp(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  return createHash('sha256').update(ip + (process.env.MONGODB_URI ?? '')).digest('hex');
}
