import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  app.enableCors()
  app.use(helmet())

  let appName = configService.get('app.name') as string
  appName = appName
    .replace(new RegExp('-', 'g'), ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`The ${appName} API description`)
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  await app.listen(configService.get('app.port'))
}
bootstrap()
