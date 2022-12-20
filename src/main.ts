import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { customLogger } from './common/helpers/customLogger'
import { loadSwagger } from './common/swagger/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new customLogger(),
  })

  const configService = app.get(ConfigService)
  app.enableCors()
  app.use(helmet())

  loadSwagger(configService.get('app.name'), app)

  const PORT: number = configService.get('app.port')
  await app.listen(PORT).then(() => {
    Logger.log(`🚀 Server ready at http://0.0.0.0:${PORT}`)
  })
}
bootstrap()
