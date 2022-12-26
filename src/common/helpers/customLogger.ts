import { LoggerService } from '@nestjs/common'
import winston from 'winston'

export class customLogger implements LoggerService {
  constructor(private logger: winston.Logger) {}

  private createLog(level: string, message: any, optionalParams: any) {
    const obj =
      typeof optionalParams[0] === 'object'
        ? Object.assign({}, ...optionalParams)
        : optionalParams[0]

    this.logger.log(level, message, obj)
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.createLog('info', message, optionalParams)
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.createLog('error', message, optionalParams)
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.createLog('warn', message, optionalParams)
  }
}
