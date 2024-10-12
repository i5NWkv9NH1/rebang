import { Job } from 'bullmq'
import { JobDefinitData } from 'src/@types'
import { FetchService } from 'src/shared/services/fetch.service'
import { genUserAgent } from 'src/utils'
import { PartConfig } from 'src/modules/bussiness/website/entities/part-config.entity'
import { Logger } from '@nestjs/common'

export abstract class BaseScrapy {
  protected abstract readonly logger: Logger
  constructor(protected readonly http: FetchService) {}

  protected getHeaders(config: PartConfig) {
    const cookie = config.cookie || ''
    const userAgent = config.userAgent || genUserAgent('desktop')

    return {
      ...config.headers,
      headers: {
        Cookie: cookie,
        'User-Agent': userAgent
      }
    }
  }

  /**
   *
   * @param {Job} job
   * @param {String} defualtUrl Site.API
   * @returns
   */
  async fetchData(job: Job<JobDefinitData>, defualtUrl: string) {
    const { config } = job.data
    const headers = this.getHeaders(config)
    return await this.http.get(config.url || defualtUrl, headers)
  }
}
