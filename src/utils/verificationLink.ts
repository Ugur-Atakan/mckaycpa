import { nanoid } from 'nanoid';

export function generateVerificationToken(): string {
  return nanoid(32); // 32 character random string
}

export function createVerificationLink(formId: string, token: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/verify/${formId}/${token}`;
}

export function isVerificationExpired(timestamp: number): boolean {
  const expiryTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return Date.now() - timestamp > expiryTime;
}