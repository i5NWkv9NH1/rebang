import { CronExpression } from '@nestjs/schedule'

export enum SHADIAONEWS_API {
  MAIN = `https://shadiao.plus/page`
}

export const SHADIAONEWS_CACHE_KEY = {
  MAIN: `SHADIAONEWS/MAIN`
}

export const SHADIAONEWS_QUEUE_NAME = `沙雕新闻` as const

export const SHADIAONEWS_JOB_DEFINE = {
  MAIN: {
    KEY: `沙雕新闻`,
    NAME: `沙雕新闻`,
    SCOPE: `沙雕新闻`,
    CRON: CronExpression.EVERY_HOUR
  }
}
