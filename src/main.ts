import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  //* config
  const configService: ConfigService = app.get(ConfigService)

  //* middlewares
  app.setGlobalPrefix(configService.get<string>('API_PREFIX'))
  app.enableCors()
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v'
  })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const host = configService.get<string>('HOST')
  const port = configService.get<string>('PORT')

  app.enableShutdownHooks()

  await app.listen(port, host)
}
bootstrap()
