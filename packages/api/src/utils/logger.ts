// packages/api/src/utils/logger.ts
// Pino logger instance

import pino from 'pino';
import { config } from '../config';

function getLoggerOptions(): pino.LoggerOptions {
  const baseOptions: pino.LoggerOptions = {
    level: config.env === 'development' ? 'debug' : 'info',
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
