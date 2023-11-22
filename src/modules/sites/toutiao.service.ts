import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError } from 'axios'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import { catchError, firstValueFrom } from 'rxjs'
import { RedisService } from 'src/shared/redis.service'

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

    const url = `https://i-lq.snssdk.com/api/feed/hotboard_online/v1/`
    const params = {
      category: 'hotboard_online',
      count: pageSize
    }
    const response = await this.get<any>(url, {}, params)
    const data = response.data.data

    await this.redisService.set('toutiao/hot', data)
    return data
  }

  public async get<T>(url: string, headers: {} = {}, params = {}) {
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
