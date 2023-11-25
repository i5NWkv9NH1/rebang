import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { catchError, firstValueFrom } from 'rxjs'

@Injectable()
export class FetchService {
  private logger = new Logger(FetchService.name)

  constructor(private readonly httpService: HttpService) {}

  public async get<T>(url: string, config: AxiosRequestConfig) {
    this.logger.log(`Http Request: ${url}`)
    return await firstValueFrom(
      this.httpService.get<T>(url, config).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data)
          throw 'An error happened!'
        })
      )
    )
  }

  public async post<T>(url: string, payload: any, config: AxiosRequestConfig) {
    this.logger.log(`Http Request: ${url}`)
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
