// packages/api/src/utils/logger.ts
// Pino logger instance

import pino from 'pino';
import { config } from '../config';

function getLoggerOptions(): pino.LoggerOptions {
  const baseOptions: pino.LoggerOptions = {
    level: config.env === 'development' ? 'debug' : 'info',
    // pino-http's default req/res serializers include headers, which
    // otherwise puts the JWT access/refresh token cookie straight into
    // every request log line. Also guards a few fields against being
    // logged directly (e.g. `logger.info({ student }, ...)`).
    redact: {
      paths: [
        'req.headers.cookie',
        'req.headers.authorization',
        'res.headers["set-cookie"]',
        'password',
        'passwordHash',
        'idNumber',
        '*.password',
        '*.passwordHash',
        '*.idNumber',
      ],
      censor: '[REDACTED]',
    },
  };

  // Use pino-pretty transport in development only if available
  if (config.env === 'development') {
    try {
      // Check if pino-pretty is available
      require.resolve('pino-pretty');
      baseOptions.transport = {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      };
    } catch (error) {
      // pino-pretty not available, fall back to plain JSON logging
      console.warn('pino-pretty not found, using plain JSON logging');
    }
  }

  return baseOptions;
}

export const logger = pino(getLoggerOptions());
