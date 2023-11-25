import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'
import { genUserAgent } from 'src/helpers'
import { TiebaHotResponse } from 'src/types'

@Injectable()
export class TiebaService {
  private logger = new Logger(TiebaService.name)

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  public async hot() {
    const cache = await this.redisService.get('tieba/hot')
    if (cache) return cache

    const url = `https://tieba.baidu.com/hottopic/browse/topicList`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const response = await this.get<TiebaHotResponse>(url, headers)

    const data = response.data.data.bang_topic.topic_list.map((item) => {
      return {
        ...item,
        id: item.topic_id,
        url: item.topic_url,
        title: item.topic_name,
        subtitle: item.topic_desc,
        thumbnail: item.topic_pic
      }
    })

    await this.redisService.set('tieba/hot', data)
    return data
  }

  public async get<T>(url: string, headers: {} = {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<T>(url, {
          headers
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw 'An error happened!'
          })
        )
    )
    return response
  }
}
