export * from './status'

import type { Job } from 'bullmq'
import type { PartConfig } from 'src/modules/bussiness/website/entities/part-config.entity'
import type { PartScraped } from 'src/modules/bussiness/website/entities/part-scraped.entity'
import type { Part } from 'src/modules/bussiness/website/entities/part.entity'

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
