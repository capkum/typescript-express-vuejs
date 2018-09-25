
import fs from 'fs';
import path from 'path';
import { createLogger, format, Logger, transports } from 'winston';

export class WinstonLogger {
  public logger: Logger;
  public level: string;

  constructor () {
    this.level = process.env.LOG_LEVEL || 'info';
    const { combine, timestamp, printf, colorize } = format;
    const myFormat = printf((info) => {
      return `[${info.level}] ${info.timestamp} ${info.message}`;
    });

    this.logger = createLogger({
      level: this.level,
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        myFormat
      ),
      transports: [
        new transports.Console({
          level: this.level,
          format: combine(
            colorize(),
            myFormat
          )
        }),
        new transports.File({
          filename: `${this.logs_path()}/error.log`,
          level: 'error',
          maxsize: 1024 * 5
        }),
        new transports.File({
          filename: `${this.logs_path()}/info.log`,
          level: 'info',
          maxsize: 1024 * 5
        })
      ]
    });
  }

  public logs_path (): string {
    const logDir: string = path.join(__dirname, '..', 'logs');
    fs.existsSync(logDir) || fs.mkdirSync(logDir);

    return logDir;
  }
}
