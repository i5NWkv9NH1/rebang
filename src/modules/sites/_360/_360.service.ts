import { Injectable, Logger } from '@nestjs/common'
import { _360Entity } from './_360.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RedisService } from 'src/shared/redis.service'
import { FetchService } from 'src/shared/fetch.service'
import { genUserAgent } from 'src/helpers'
import { Origin_360RankResponse, _360Item } from './_360.type'
import { _360_API } from './_360.constant'

@Injectable()
export class _360Service {
  private readonly logger = new Logger(_360Service.name)

  public headers = {
    'User-Agent': genUserAgent('mobile')
  }

  constructor(
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  public async fetchRank(pageSize: number = 50) {
    const url = _360_API.RANK
    const params = {
      type: 'news',
      realhot_limit: 50,
      src: 'hao_ranklist_so'
    }

    const response = await this.fetchService.get<Origin_360RankResponse>(url, {
      headers: this.headers,
      params
    })
    const items: _360Item[] = response.data.map((item) => {
      return {
        id: +item.index,
        title: item.title || item.keyword || item.long_title,
        thumbnailUrl: item.newscard_imgurl,
        originUrl: item.url,
        publishedDate: item.recordTime,
        status: {
          fresh: Boolean(+item.ifnew)
        },
        stats: {
          hot: +item.score
        }
      }
    })

    return items
  }
}
