import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError } from 'axios'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import { catchError, firstValueFrom } from 'rxjs'
import { genUserAgent } from 'src/helpers'
import { RedisService } from 'src/shared/redis.service'
import { ToutiaoItem, ToutiaoHotResponse } from 'src/types'

@Injectable()
export class ToutiaoService {
  private logger = new Logger(ToutiaoService.name)

  constructor(
    private readonly redisService: RedisService,
    @InjectBrowser() private readonly browser: Browser,
    private httpService: HttpService
  ) {}

  public async hot(pageSize: number = 50) {
    const cache = await this.redisService.get('toutiao/hot')
    if (cache) return cache

    // const url = `https://i-lq.snssdk.com/api/feed/hotboard_online/v1/`
    // const url = `https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc&_signature=_02B4Z6wo00901K4GSOgAAIDAd0X-V23-tBiuIkxAAE7hvBn4bCXyuX5Ke-yAkoA6FgpYmaV2ASCJYSXCTrP2Vq4qxe6oYVX3XtSjG6mqKdQrnFl0w0hhtJ0JSR-ZBaElW8V7cdn50RRCiXtq7b`
    const url = `https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc`
    const userAgent = genUserAgent('desktop')

    const headers = { 'user-agent': userAgent }
    const response = await this.get<ToutiaoHotResponse>(url, headers)
    const data = response.data.data.map((item) => {
      const title = item.Title
      const url = `${new URL(item.Url).host}${new URL(item.Url).pathname}`
      const thumbnail = item.Image.url
      const metrics = [item.LabelDesc, item.Label].filter((item) => item)
      const icon = item.Label
      const desc = item.LabelDesc
      return { title, url, thumbnail, metrics, icon, desc }
    })

    await this.redisService.set('toutiao/hot', data)
    return data
  }

  public async get<T>(url: string, headers: {} = {}, params?: {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<T>(url, {
          headers,
          params
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
