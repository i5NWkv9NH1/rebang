import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { catchError, firstValueFrom, map } from 'rxjs'

@Injectable()
export class FetchService {
  private logger = new Logger(FetchService.name)

  constructor(private readonly httpService: HttpService) {}

  public async get<T>(url: string, config: AxiosRequestConfig) {
    this.logger.debug(`Http Request: ${url}`)
    this.logger.debug(config.params)
    this.logger.debug(config.headers)
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

  public async post<T>(url: string, payload: any, config: AxiosRequestConfig) {
    this.logger.debug(`Http Request: ${url}`)
    this.logger.debug(payload)
    this.logger.debug(config.headers)
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
