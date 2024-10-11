import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { catchError, firstValueFrom, map } from 'rxjs'
import { genUserAgent } from 'src/utils'

@Injectable()
export class FetchService {
  protected readonly logger = new Logger(FetchService.name)
  protected readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(private readonly httpService: HttpService) {}

  public async get<T = any>(
    url: string,
    config: AxiosRequestConfig = {
      headers: this.headers
    }
  ) {
    // return await firstValueFrom(
    //   this.httpService.get<T>(url, config).pipe(
    //     catchError((error: AxiosError) => {
    //       this.logger.error(error.response.data)
    //       throw 'An error happened!'
    //     })
    //   )
    // )
    // return this.httpService.get<T>(url, config).pipe(map((res) => res.data))
    return this.httpService.axiosRef.get<T>(url, config)
  }

  public async post<T>(
    url: string,
    payload: any = {},
    config: AxiosRequestConfig = {}
  ) {
    return await firstValueFrom(
      this.httpService.post<T>(url, payload, config).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data)
          throw 'An error happened!'
        })
      )
    )
  }
}
