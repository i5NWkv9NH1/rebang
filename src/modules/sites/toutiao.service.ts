import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError } from 'axios'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import { catchError, firstValueFrom } from 'rxjs'

@Injectable()
export class ToutiaoService {
  private logger = new Logger(ToutiaoService.name)

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private httpService: HttpService
  ) {}

  public async hot(pageSize: number = 50) {
    const url = `https://i-lq.snssdk.com/api/feed/hotboard_online/v1/`
    const params = {
      category: 'hotboard_online',
      count: pageSize
    }
    const response = await this.http<any>(url, {}, params)
    return response.data.data
  }

  public async http<T>(url: string, headers: {} = {}, params = {}) {
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
