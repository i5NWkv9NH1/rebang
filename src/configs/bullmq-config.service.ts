import {
  BullModuleExtraOptions,
  BullRootModuleOptions,
  SharedBullConfigurationFactory
} from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class BullMqConfigService implements SharedBullConfigurationFactory {
  constructor(private readonly configService: ConfigService) {}

  createSharedConfiguration():
    | Promise<BullRootModuleOptions>
    | BullRootModuleOptions {
    return {
      connection: {
        host: this.configService.get('REDIS_HOST'),
        port: +this.configService.get('REDIS_PORT'),
        keyPrefix: this.configService.get('BULL_KEY')
      }
    }
  }
}
