import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpConfig, IConfigs } from './configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const configs = app.get(ConfigService);
  // const { host, port } = configs.get<HttpConfig>('http');
  app.enableShutdownHooks();

  await app.listen(4002);
}
bootstrap();
