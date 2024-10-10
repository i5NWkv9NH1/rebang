import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  //* middlewares
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  //* config
  const configService: ConfigService = app.get(ConfigService)
  const host = configService.get<string>('HOST')
  const port = configService.get<string>('PORT')

  app.enableShutdownHooks()

  await app.listen(port, host)
}
bootstrap()
