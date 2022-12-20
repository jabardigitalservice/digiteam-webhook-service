import { LoggerService } from '@nestjs/common'
import { NestjsWinstonLoggerService } from 'nestjs-winston-logger'
import { format, transports } from 'winston'

export class customLogger implements LoggerService {
  private format(message: any) {
    const logger = new NestjsWinstonLoggerService({
      format: format.combine(format.timestamp({ format: 'isoDateTime' }), format.json()),
      transports: [new transports.Console()],
    })

    if (typeof message === 'string') {
      logger.log(message)
      return
    }

    logger.log(JSON.stringify(message))
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.format(message)
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.format(message)
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {}

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {}
}
