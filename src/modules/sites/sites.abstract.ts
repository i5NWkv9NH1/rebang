import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export abstract class SiteProvider {
  private logger = new Logger(SiteProvider.name)

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

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
