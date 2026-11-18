// Prints the ADMIN_LOGIN_VERIFIER value for a password: node scripts/create-login-verifier.mjs
import { createHash, createHmac, pbkdf2Sync, randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { Writable } from 'node:stream';

const ITERATIONS = 600_000;

// Muted output keeps the password off the screen and out of shell history
const muted = new Writable({ write: (_chunk, _encoding, callback) => callback() });
const prompt = createInterface({ input: process.stdin, output: muted, terminal: true });
process.stdout.write('Admin password: ');
const password = await prompt.question('');
prompt.close();
process.stdout.write('\n');

if (!password) {
  console.error('Password is required');
  process.exit(1);
}

const salt = randomBytes(16);
const saltedPassword = pbkdf2Sync(password.normalize('NFKC'), salt, ITERATIONS, 32, 'sha256');
const clientKey = createHmac('sha256', saltedPassword).update('Client Key').digest();
const storedKey = createHash('sha256').update(clientKey).digest();

console.log(`ADMIN_LOGIN_VERIFIER=${ITERATIONS}.${salt.toString('base64')}.${storedKey.toString('base64')}`);
