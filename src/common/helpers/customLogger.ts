import { LoggerService } from '@nestjs/common'
import winston from 'winston'

export class customLogger implements LoggerService {
  constructor(private logger: winston.Logger) {}

  private createLog(level: string, message: any) {
    message = typeof message === 'string' ? message : JSON.stringify(message)
    this.logger.log(level, message)
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.createLog('info', message)
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.createLog('error', message)
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.createLog('warn', message)
  }
}
