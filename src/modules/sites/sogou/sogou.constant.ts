import { CronExpression } from '@nestjs/schedule'

export enum SOGOU_API {
  HOT = `https://go.ie.sogou.com/hot_ranks`
}

export const SOGOU_CACHE_KEY = {
  HOT: `SOGOU/HOT`
}

export const SOGOU_QUEUE_NAME = `搜狗` as const

export const SOGOU_JOB_DEFINE = {
  HOT: {
    KEY: `热搜`,
    NAME: `热搜`,
    SCOPE: `搜狗/热搜`,
    CRON: CronExpression.EVERY_5_MINUTES
  }
}
