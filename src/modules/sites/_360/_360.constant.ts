import { CronExpression } from '@nestjs/schedule'

export enum _360_API {
  RANK = `https://ranks.hao.360.com/mbsug-api/hotnewsquery`
}
export const _360_CACHE_KEY = {
  RANK: `360/RANK`
}

export const _360_QUEUE_NAME = `360` as const

export const _360_JOB_DEFINE = {
  RANK: {
    KEY: '热搜',
    NAME: '热搜',
    SCOPE: '360/热搜',
    CRON: CronExpression.EVERY_5_MINUTES
  }
}
