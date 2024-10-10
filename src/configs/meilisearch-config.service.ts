import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'meilisearch'
import { MeiliModuleOptionsFactory } from 'nestjs-meilisearch'

@Injectable()
export class MeilliSearchConfigService implements MeiliModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMeiliOptions(): Promise<Config> | Config {
    const url = `http://${this.configService.get(
      'MEILLI_HOST'
    )}:${this.configService.get('MEILLI_PORT')}`

    return {
      host: url,
      apiKey: this.configService.get('MEILLI_KEY')
    }
  }
}
