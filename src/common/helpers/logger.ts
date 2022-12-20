import { NestjsWinstonLoggerService } from 'nestjs-winston-logger'
import { format, transports } from 'winston'

export default new NestjsWinstonLoggerService({
  format: format.combine(format.timestamp({ format: 'isoDateTime' }), format.json()),
  transports: [new transports.Console()],
})
