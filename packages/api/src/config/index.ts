// packages/api/src/config/index.ts
// Central configuration from environment variables

import 'dotenv/config';
import path from 'path';

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optional(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

function optionalInt(key: string, defaultValue: number): number {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
}

export const config = {
  env: optional('NODE_ENV', 'development'),
  port: optionalInt('PORT', 3600),

  // Database
  databaseUrl: required('DATABASE_URL'),
  redisUrl: optional('REDIS_URL', 'redis://localhost:3611'),

  // CORS
  corsOrigins: optional('CORS_ORIGINS', 'http://localhost:3601,http://localhost:3602')
    .split(',')
    .map((s) => s.trim()),
  portalUrl: optional('PORTAL_URL', 'http://localhost:3601'),
  adminUrl: optional('ADMIN_URL', 'http://localhost:3602'),

  // JWT
  jwt: {
    accessSecret: required('JWT_ACCESS_SECRET'),
    refreshSecret: required('JWT_REFRESH_SECRET'),
    accessExpires: optional('JWT_ACCESS_EXPIRES', '15m'),
    refreshExpires: optional('JWT_REFRESH_EXPIRES', '30d'),
  },

  // Rate limiting
  rateLimit: {
    windowMs: optionalInt('RATE_LIMIT_WINDOW_MS', 900000), // 15 minutes
    maxRequests: optionalInt('RATE_LIMIT_MAX_REQUESTS', 100),
  },

  // Email
  email: {
    mode: optional('EMAIL_MODE', 'dev') as 'dev' | 'production',
    smtp: {
      host: optional('SMTP_HOST', ''),
      port: optionalInt('SMTP_PORT', 587),
      user: optional('SMTP_USER', ''),
      pass: optional('SMTP_PASS', ''),
      from: optional('SMTP_FROM', 'ApplyOnce <no-reply@applyonce.co.za>'),
    },
  },

  // Storage
  storage: {
    type: optional('STORAGE_TYPE', 'local'),
    localPath: optional('STORAGE_LOCAL_PATH', path.join(process.cwd(), 'uploads')),
  },

  // PayGate
  paygate: {
    id: optional('PAYGATE_ID', '10011072130'),
    secret: optional('PAYGATE_SECRET', 'secret'),
    sandbox: optional('PAYGATE_SANDBOX', 'true') === 'true',
  },
} as const;

export type Config = typeof config;
