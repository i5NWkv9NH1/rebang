import { CronExpression } from '@nestjs/schedule'

export enum PENGPAI_API {
  HOT = `https://cache.thepaper.cn/contentapi/contVisit/hotNews`,
  CHANNEL = `https://api.thepaper.cn/contentapi/nodeCont/getByChannelId`,
  NODE = `https://api.thepaper.cn/contentapi/nodeCont/getByNodeIdPortal`
}

export const PENGPAI_CACHE_KEY = {
  HOT: `PENGPAI/HOT`,
  CHANNEL: `PENGPAI/CHANNEl`,
  NODE: `PENGPAI/NODE`
}

export const PENGPAI_QUEUE_NAME = `澎湃新闻` as const

export const PENGPAI_JOB_DEFINE = {
  HOT: {
    KEY: `热榜`,
    NAME: `热榜`,
    SCOPE: `澎湃新闻/热榜`,
    CRON: CronExpression.EVERY_HOUR
  }
}
