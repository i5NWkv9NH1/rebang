import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { HttpConfig, IConfigs } from './shared/configuration'
import fastifyListRoutes from 'fastify-list-routes'
// import expressListRoutes from 'express-list-routes'
import {
  NestFastifyApplication,
  FastifyAdapter
} from '@nestjs/platform-fastify'
import { join } from 'path'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
// import { ValidationPipe } from './shared/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
    // new FastifyAdapter()
  )
  // await app.register(fastifyListRoutes, { colors: true })

  // const configs = app.get(ConfigService);
  // const { host, port } = configs.get<HttpConfig>('http');
  app.enableShutdownHooks()
  // app.setGlobalPrefix('api', { exclude: ['/public/(.*)', '/queues/(.*)'] })
  // app.useStaticAssets({
  //   root: join(__dirname, '..', 'public'),
  //   prefix: '/public/'
  // })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          field: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]]
        }))
        return new BadRequestException(result)
      },
      stopAtFirstError: true
    })
  )
  // //* mvc
  // app.setViewEngine({
  //   engine: {
  //     handlebars: require('handlebars')
  //   },
  //   templates: join(__dirname, '..', 'views')
  // })

  await app.listen(4002, '0.0.0.0')
}
bootstrap()
