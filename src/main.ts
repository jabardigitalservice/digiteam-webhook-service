import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app.module'
import logger from './common/helpers/logger'
import { loadSwagger } from './common/swagger/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })

  const configService = app.get(ConfigService)
  app.enableCors()
  app.use(helmet())
  app.useLogger(logger)

  loadSwagger(configService.get('app.name'), app)

  const PORT: number = configService.get('app.port')
  await app.listen(PORT).then(() => {
    logger.log(`🚀 Server ready at http://0.0.0.0:${PORT}`)
  })
}
bootstrap()
