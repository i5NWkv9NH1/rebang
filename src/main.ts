import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { HttpConfig, IConfigs } from './configuration'
import {
  NestFastifyApplication,
  FastifyAdapter
} from '@nestjs/platform-fastify'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  // const configs = app.get(ConfigService);
  // const { host, port } = configs.get<HttpConfig>('http');
  app.enableShutdownHooks()
  app.setGlobalPrefix('api')
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/'
  })
  // //* mvc
  // app.setViewEngine({
  //   engine: {
  //     handlebars: require('handlebars')
  //   },
  //   templates: join(__dirname, '..', 'views')
  // })

  await app.listen(4002)
}
bootstrap()
