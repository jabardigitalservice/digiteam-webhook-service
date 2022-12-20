import winston, { format, transports } from 'winston'

const logger = winston.createLogger({
  format: format.combine(format.timestamp({ format: 'isoDateTime' }), format.json()),
  transports: [new transports.Console()],
})

export default logger
