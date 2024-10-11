import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'meilisearch'
import { MeiliModuleOptionsFactory } from 'nestjs-meilisearch'

@Injectable()
export class MeilliSearchConfigService implements MeiliModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMeiliOptions(): Promise<Config> | Config {
    const url = `${this.configService.get(
      'MEILI_HOST'
    )}:${parseInt(this.configService.get('MEILI_PORT'))}`

    return {
      host: url,
      apiKey: this.configService.get('MEILI_MASTER_KEY')
    }
  }
}
