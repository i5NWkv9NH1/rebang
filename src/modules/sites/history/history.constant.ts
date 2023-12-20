import { CronExpression } from '@nestjs/schedule'
import e from 'express'

export const HISTORY_API = {
  _360: `https://hao.360.com/histoday`
}

export enum HISTORY_TABS {
  _360 = '360',
  WIKI = 'wiki'
}

export const HISTORY_CACHE_KEY = {
  _360: `HISTORY/360`,
  WIKI: `HISTORY/WIKI`
}

export const HISTORY_QUEUE_NAME = `历史上的今天`

export const HISTORY_JOB_DEFINE = {
  _360: {
    KEY: `360`,
    NAME: `360`,
    SCOPE: `历史上的今天/360`,
    CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
  },
  WIKI: {
    KEY: `WIKI`,
    NAME: `WIKI`,
    SCOPE: `历史上的今天/WIKI`,
    CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
  }
}
