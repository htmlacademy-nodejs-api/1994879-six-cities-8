import * as crypto from 'node:crypto';

export const hashPassword = (line: string, salt: string): string =>
  crypto.createHmac('sha256', salt).update(line).digest('hex');

export const verifyPassword = (password: string, hash: string, salt: string): boolean => {
  const newHash = crypto.createHmac('sha256', salt).update(password).digest('hex');
  return newHash === hash;
};
