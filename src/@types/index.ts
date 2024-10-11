import { Job } from 'bullmq'
import { PartConfig } from 'src/modules/bussiness/website/entities/part-config.entity'
import { PartScraped } from 'src/modules/bussiness/website/entities/part-scraped.entity'
import { Part } from 'src/modules/bussiness/website/entities/part.entity'

export type JobDefinitData<T = Part, K = PartConfig> = {
  part: T
  config: K
}

export interface RedisData<
  T = PartScraped,
  K = JobDefinitData['part'],
  V = JobDefinitData['config']
> {
  job: ReturnType<Job['asJSON']>
  items: T[] // 爬取的数据
  part: K
  config: V
}
