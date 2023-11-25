import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class WereadService {
  private logger = new Logger(WereadService.name)

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //? 飙升
  public async rising() {
    const url = `https://weread.qq.com/web/bookListInCategory/rising?maxIndex=20&rank=1`
  }
  //? 新书
  public async newBook() {
    const url = `https://weread.qq.com/web/bookListInCategory/newbook?maxIndex=20&rank=1`
  }
  //? 小说
  public async novel() {
    const url = `https://weread.qq.com/web/bookListInCategory/general_novel_rising?maxIndex=20&rank=1`
  }
  //? 总榜
  public async all() {
    const url = `https://weread.qq.com/web/bookListInCategory/all?maxIndex=20&rank=1`
  }
  //? 神作榜
  public async newRating() {
    const url = `https://weread.qq.com/web/bookListInCategory/newrating_publish?maxIndex=20&rank=1`
  }
  //? 神作 / 潜力榜
  public async newRatingPotential() {
    const url = `https://weread.qq.com/web/bookListInCategory/newrating_potential_publish?maxIndex=20&rank=1`
  }
  //? 热搜榜
  public async hotSearch() {
    const url = `https://weread.qq.com/web/bookListInCategory/hot_search?maxIndex=20&rank=1`
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
