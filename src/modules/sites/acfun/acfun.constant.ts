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

export const ACFUN_CRON = {
  RANK: {
    DAY: CronExpression.EVERY_10_SECONDS,
    THREE_DAYS: CronExpression.EVERY_10_SECONDS,
    WEEK: CronExpression.EVERY_10_SECONDS
  }
}
export const ACFUN_CACHE_KEY = {
  RANK: {
    DAY: 'ACFUN/RANK/DAY',
    THREE_DAYS: '',
    WEEK: ''
  }
}
export const ACFUN_CACHE_TTL = {
  RANK: {
    DAY: 3600,
    THREE_DAYS: 3600,
    WEEK: 3600
  }
}
export const ACFUN_ROUTE = {
  RANK: {
    DAY: '',
    THREE_DAYS: '',
    WEEK: ''
  }
}
export const ACFUN_TASK = {
  RANK: {
    DAY: 'ACFUN_TASK_DAY',
    THREE_DAYS: 'ACFUN_TASK_THREE_DAY',
    WEEK: 'ACFUN_TASK_WEEK'
  }
}
