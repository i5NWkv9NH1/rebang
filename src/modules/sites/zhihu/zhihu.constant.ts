import { CronExpression } from '@nestjs/schedule'

export enum ZHIHU_API {
  RANK = `https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total`,
  ME = `https://www.zhihu.com/api/v4/me`
}

export const ZHIHU_CACHE_KEY = {
  RANK: `ZHIHU/HOT`,
  COOKIE: `ZHIHU/COOKIE`,
  BILLBOARD: `ZHIHU/BILLBOARD`,
  ME: `ZHIHU/ME`
}

export const ZHIHU_QUEUE_NAME = `知乎` as const
export const ZHIHU_JOB_DEFINE = {
  BILLBOARD: {
    KEY: `热搜`,
    NAME: `热搜`,
    SCOPE: `知乎/热搜`,
    CRON: CronExpression.EVERY_HOUR
  }
}
