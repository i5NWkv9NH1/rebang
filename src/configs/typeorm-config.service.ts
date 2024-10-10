import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres', // 或 'postgres', 根据你的数据库类型
      host: this.configService.get('DB_HOST'),
      port: +this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      synchronize: true,
      autoLoadEntities: true,
      cache: {
        type: 'redis',
        options: {
          host: this.configService.get('REDIS_HOST'),
          port: +this.configService.get('REDIS_PORT')
        }
      }
    }
  }
}
