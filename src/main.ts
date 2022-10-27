import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { loadSwagger } from './common/swagger/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  app.enableCors()
  app.use(helmet())

  loadSwagger(configService.get('app.name'), app)

  await app.listen(configService.get('app.port'))
}
bootstrap()
