import { CronExpression } from '@nestjs/schedule'

export const ZHIHU_DAILY_API = {}

export const ZHIHU_DAILY_CACHE_KEY = {
  LATEST: `ZHIHU_DAILY/LATEST`
}

export const ZHIHU_DAILY_QUEUE_NAME = `知乎日报` as const

export const ZHIHU_DAILY_JOB_DEFINE = {
  LATEST: {
    KEY: `最新`,
    NAME: `最新`,
    SCOPE: `知乎日报/最新`,
    CRON: CronExpression.EVERY_DAY_AT_10AM
  }
}
