import { CronExpression } from '@nestjs/schedule'

export enum ZAKER_API {
  WEB_HOT_NEXT_URL = `https://www.myzaker.com/channel/660`,
  WEB_ONLY_ONE_URL = `https://www.myzaker.com/channel/23317`
}

export const ZAKER_CACHE_KEY = {
  WEB_HOT_NEXT_URL: `ZAKER/WEB_OT_NEXT_URL`,
  WEB_ONLY_ONE_NEXT_URL: `ZAKER/WEB_ONLY_ONE_NEXT_URL`,
  HOT: `ZAKER/HOT`,
  ONLYONE: `ZAKER/ONLYONE`
}

export const ZAKER_QUEUE_NAME = `Zaker 新闻`

export const ZAKER_JOB_DEFINE = {
  HOT: {
    KEY: `热文`,
    NAME: `热文`,
    SCOPE: `Zaker/热文`,
    CRON: CronExpression.EVERY_10_MINUTES
  },
  ONLYONE: {
    KEY: `独家`,
    NAME: `独家`,
    SCOPE: `Zaker/独家`,
    CRON: CronExpression.EVERY_HOUR
  }
}
