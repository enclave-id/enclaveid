import winston from 'winston';

export const logger = winston.createLogger({
  // Define levels required by Fastify (by default winston has verbose level and does not have trace)
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    trace: 4,
    debug: 5,
  },
  // Setup log level
  level: 'info',
  // Setup logs format
  format: winston.format.json(),
  // Define transports to write logs, it could be http, file or console
  transports: [new winston.transports.Console()],
});
