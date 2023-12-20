import { CronExpression } from '@nestjs/schedule'

export enum WEIBO_API {
  VERIFY_CODE = `https://api.weibo.cn/2/account/login_sendcode`,
  LOGIN = `https://api.weibo.cn/2/account/login`,
  HOT_SEARCH = `https://weibo.com/ajax/side/hotSearch`,
  NEWS = `https://weibo.com/ajax/statuses/news`,
  ENTRANK = `https://weibo.com/ajax/statuses/entertainment`,
  TOPIC_BAND = `https://weibo.com/ajax/statuses/topic_band`
}
export const WEIBO_CACHE_KEY = {
  VERIFY_CODE: `WEIBO/VERIFY_CODE`,
  LOGIN: `WEIBO/LOGIN`,
  COOKIE: `WEIBO/COOKIE`,
  HOT_SEARCH: `WEIBO/HOT_SEARCH`,
  NEWS: `WEIBO/NEWS`,
  ENTRANK: `WEIBO/ENTRANK`,
  TOPIC_BAND: `WEIBO/TOPIC_BAND`
}

export const WEIBO_COOKIE_DOMAIN = `.weibo.cn` as const
export const WEIBO_QUEUE_NAME = `微博` as const
export const WEIBO_JOB_DEFINE = {
  HOT_SEARCH: {
    KEY: `热搜`,
    NAME: `热搜`,
    SCOPE: `微博/热搜`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  NEWS: {
    KEY: `要闻（新时代）`,
    NAME: `要闻（新时代）`,
    SCOPE: `微博/要闻（新时代）`,
    CRON: CronExpression.EVERY_HOUR
  },
  ENTRANK: {
    KEY: `文娱`,
    NAME: `文娱`,
    SCOPE: `微博/文娱`,
    CRON: CronExpression.EVERY_HOUR
  },
  TOPIC_BAND: {
    KEY: `话题`,
    NAME: `话题`,
    SCOPE: `微博/话题`,
    CRON: CronExpression.EVERY_HOUR
  }
}
