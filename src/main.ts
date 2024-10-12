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
  //* transform: 传入的字符串可以被自动转换为数值、布尔值，或者嵌套的对象也会被转换为正确的实例。
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const host = configService.get<string>('HOST')
  const port = configService.get<string>('PORT')

  app.enableShutdownHooks()

  await app.listen(port, host)
}
bootstrap()
