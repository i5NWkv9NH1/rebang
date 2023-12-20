import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'
import { SOGOU_API, SOGOU_CACHE_KEY } from './sogou.constant'

@Injectable()
export class SogouService {
  private readonly logger = new Logger(SogouService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  async hot() {
    const response = await this.fetchService.get<any>(SOGOU_API.HOT, {
      headers: this.headers
    })

    const items = response.data.data.map((item: any) => {
      return {
        title: item.attributes.title,
        originUrl:
          'https://www.sogou.com/web?ie=utf8&query=' + item.attributes.title,
        status: {
          flag: item.attributes.flag
        },
        stats: {
          hot: item.attributes.num
        }
      }
    })

    return items
  }
}
