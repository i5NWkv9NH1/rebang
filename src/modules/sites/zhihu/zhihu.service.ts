import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RedisService } from 'src/shared/redis.service'
import { ZhihuEntity } from './zhihu.entity'
import { Repository } from 'typeorm'
import { genUserAgent, zhStringtoNum } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import * as cheerio from 'cheerio'
import { OriginZhihuResponse, ZhihuItem } from './zhihu.type'

@Injectable()
export class ZhihuService {
  private readonly logger = new Logger(ZhihuService.name)

  public headers = {
    'User-Agent': genUserAgent('mobile')
  }

  constructor(
    @InjectRepository(ZhihuEntity)
    private readonly repo: Repository<ZhihuEntity>,
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  public async fetchBillboard() {
    const url = `https://www.zhihu.com/billboard`

    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })

    const $ = cheerio.load(response.data, { xmlMode: false })
    let items: ZhihuItem[] = []
    $('script').each((_, el) => {
      const id = $(el).attr('id')
      if (id === 'js-initialData') {
        const json = JSON.parse($(el).text()) as OriginZhihuResponse
        const parsedJSON = json['initialState']['topstory']['hotList']
        items = parsedJSON.map((item) => {
          return {
            id: item.id || item.cardId,
            title: item.target.titleArea.text,
            caption: item.target.excerptArea.text,
            thumbnailUrl: item.target.imageArea.url,
            originUrl: item.target.link.url,
            stats: {
              hot: zhStringtoNum(item.target.metricsArea.text),
              answer: item.feedSpecific.answerCount
            }
          }
        })
      }
    })

    return { items }
  }
}
