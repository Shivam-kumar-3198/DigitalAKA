import { Injectable, Logger as NestLogger } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';

@Injectable()
export class Logger {
  private logger: winston.Logger;

  constructor() {
    const logDir = 'logs';
    const isDevelopment = process.env.NODE_ENV === 'development';

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'debug',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ level, message, timestamp, stack }) => {
          const stackTrace = stack ? `\n${stack}` : '';
          return `${timestamp} [${level.toUpperCase()}]: ${message}${stackTrace}`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ level, message, timestamp }) => {
              return `${timestamp} [${level}]: ${message}`;
            }),
          ),
        }),
        ...(isDevelopment
          ? []
          : [
              new winston.transports.File({
                filename: path.join(logDir, 'error.log'),
                level: 'error',
              }),
              new winston.transports.File({
                filename: path.join(logDir, 'application.log'),
              }),
            ]),
      ],
    });
  }

  log(message: string, context?: string): void {
    const contextStr = context ? `[${context}]` : '';
    this.logger.info(`${contextStr} ${message}`);
  }

  error(message: string, trace?: string, context?: string): void {
    const contextStr = context ? `[${context}]` : '';
    this.logger.error(`${contextStr} ${message}`, { trace });
  }

  warn(message: string, context?: string): void {
    const contextStr = context ? `[${context}]` : '';
    this.logger.warn(`${contextStr} ${message}`);
  }

  debug(message: string, context?: string): void {
    const contextStr = context ? `[${context}]` : '';
    this.logger.debug(`${contextStr} ${message}`);
  }
}
