import { CronExpression } from '@nestjs/schedule'

export enum ACFUN_RANK_TYPE {
  DAY,
  THREE_DAYS,
  WEEK
}

export const ACFUN_API = {
  RANK: {
    DAY: 'https://www.acfun.cn/rest/pc-direct/rank/channel',
    THREE_DAYS: 'https://www.acfun.cn/rest/pc-direct/rank/channel',
    WEEK: 'https://www.acfun.cn/rest/pc-direct/rank/channel'
  }
}

export const ACFUN_CACHE_KEY = {
  RANK: {
    DAY: 'ACFUN/RANK/DAY',
    THREE_DAYS: 'ACFUN/RANK/THREE_DAYS',
    WEEK: 'ACFUN/RANK/WEEK'
  }
}

export const ACFUN_QUEUE_NAME = `A站` as const

export const ACFUN_JOB_DEFINE = {
  RANK: {
    DAY: {
      KEY: `今日榜`,
      NAME: `今日榜`,
      SCOPE: `A站/榜单/今日`,
      CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
    },
    THREE_DAYS: {
      KEY: `三日榜`,
      NAME: `三日榜`,
      SCOPE: `A站/榜单/三日`,
      CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
    },
    WEEK: {
      KEY: `周榜`,
      NAME: `周榜`,
      SCOPE: `A站/榜单/周榜`,
      CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
    }
  }
}
