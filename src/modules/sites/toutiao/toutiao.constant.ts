import { CronExpression } from '@nestjs/schedule'

export enum TOUTIAO_API {
  HOT = `https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc`
}

export const TOUTIAO_CACHE_KEY = {
  HOT: `TOUTIAO/HOT`
}

export const TOUTIAO_QUEUE_NAME = `今日头条`

export const TOUTIAO_JOB_DEFINE = {
  HOT: {
    KEY: `热榜`,
    NAME: `热榜`,
    SCOPE: `今日头条/热榜`,
    CRON: CronExpression.EVERY_HOUR
  }
}
