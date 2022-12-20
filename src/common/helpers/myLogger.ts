import { LoggerService } from '@nestjs/common'
import logger from './logger'

export class MyLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    if (typeof message === 'string') {
      logger.log(message)
      return
    }

    logger.log(JSON.stringify(message))
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    if (typeof message === 'string') {
      logger.log(message)
      return
    }

    logger.log(JSON.stringify(message))
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
