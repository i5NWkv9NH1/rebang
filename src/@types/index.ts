import { Job } from 'bullmq'
import { PartConfig } from 'src/modules/bussiness/website/entities/part-config.entity'
import { PartScraped } from 'src/modules/bussiness/website/entities/part-scraped.entity'

export type JobConfig = PartConfig
export interface JobDefinitData<T = JobConfig, K = PartScraped> {
  config: T
}

export interface RedisData<T = PartScraped, K = JobConfig> {
  items: T[] // 爬取的睡觉
  job: Job
  config: K
}
