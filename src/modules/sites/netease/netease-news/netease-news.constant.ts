import { CronExpression } from '@nestjs/schedule'

export const NETEASE_NEWS_API = {
  HOT: `https://gw.m.163.com/nc-main/api/v1/hqc/no-repeat-hot-list`,
  //* 热议
  COMMENT: `https://gw.m.163.com/gentie-web/api/v2/products/a2869674571f77b5a0867c3d71db5856/rankDocs/all/list?ibc=newsapph5&limit=30`,
  SEARCH: `https://gw.m.163.com/search/api/v2/hot-search`,
  VIDEO: `https:/gw.m.163.com/nc/api/v1/feed/dynamic/hqc/video-hot-list`,
  TOPIC: `https://gw.m.163.com/nc/api/v1/feed/dynamic/topic/hotList`
}

export const NETEASE_NEWS_CACHE_KEY = {
  HOT: `NETEASE/NEWS/RANK`,
  COMMENT: `NETEASE/NEWS/COMMENT`,
  SEARCH: `NETEASE/NEWS/SEARCH`,
  VIDEO: `NETEASE/NEWS/VIDEO`,
  TOPIC: `NETEASE/NEWS/TOPIC`
}

export const NETEASE_NEWS_QUEUE_NAME = `网易新闻` as const

export const NETEASE_NEWS_JOB_DEFINE = {
  HOT: {
    KEY: `热榜`,
    NAME: `热榜`,
    SCOPE: `网易新闻/热榜`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  COMMENT: {
    KEY: `热议榜`,
    NAME: `热议榜`,
    SCOPE: `网易新闻/热议榜`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  SEARCH: {
    KEY: `热搜榜`,
    NAME: `热搜榜`,
    SCOPE: `网易新闻/热搜榜`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  VIDEO: {
    KEY: `视频榜`,
    NAME: `视频榜`,
    SCOPE: `网易新闻/视频榜`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  TOPIC: {
    KEY: `话题榜`,
    NAME: `话题榜`,
    SCOPE: `网易新闻/话题榜`,
    CRON: CronExpression.EVERY_5_MINUTES
  }
}
