import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'debug',
  format: format.json(),
  transports: [new transports.Console({})],
});
