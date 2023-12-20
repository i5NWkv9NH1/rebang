import { CronExpression } from '@nestjs/schedule'

export const BILIBILI_API = {
  HOT: `https://api.bilibili.com/x/web-interface/wx/hot?pn=1&ps=100&teenage_mode=0`,
  WEEK: 'https://api.bilibili.com/x/web-interface/popular/series/one?number=242',
  RANK: 'https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all'
}

export const BILIBILI_CACHE_KEY = {
  HOT: `BILIBILI/HOT`,
  WEEK: `BILIBILI/WEEK`,
  RANK: `BILIBILI/RANK`
}

export const BILIBILI_QUEUE_NAME = `哔哩哔哩` as const

export const BILIBILI_JOB_DEFINE = {
  HOT: {
    KEY: `热门推荐`,
    NAME: `热门推荐`,
    SCOPE: `B站/热门推荐`,
    CRON: CronExpression.EVERY_HOUR
  },
  WEEK: {
    KEY: `每周必看`,
    NAME: `每周必看`,
    SCOPE: `B站/每周必看`,
    CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
  },
  RANK: {
    KEY: `排行榜`,
    NAME: `排行榜`,
    SCOPE: `B站/排行榜`,
    CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
  }
}
