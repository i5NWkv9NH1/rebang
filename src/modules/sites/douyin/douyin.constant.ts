import { CronExpression } from '@nestjs/schedule'

export const DOUYIN_API = {
  COOKIE: `https://www.douyin.com/passport/general/login_guiding_strategy/?aid=6383`,
  HOT: `https://www.douyin.com/aweme/v1/web/hot/search/list`
}

export const DOUYIN_CACHE_KEY = {
  COOKIE: 'DOUYIN/COOKIE',
  HOT: 'DOUYIN/HOT'
}

export const DOUYIN_QUEUE_NAME = `抖音` as const

export const DOUYIN_JOB_DEFINE = {
  HOT: {
    KEY: `热搜`,
    NAME: `热搜`,
    SCOPE: `抖音/热搜`,
    CRON: CronExpression.EVERY_HOUR
  }
}
