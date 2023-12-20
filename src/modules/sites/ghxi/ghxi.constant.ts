import { CronExpression } from '@nestjs/schedule'

export enum GHXI_API {
  LATEST = `https://www.ghxi.com/ghapi?type=query&n=new`,
  PC = `https://www.ghxi.com/ghapi?type=query&n=pc`,
  ANDROID = `https://www.ghxi.com/ghapi?type=query&n=and`
}

export const GHXI_CACHE_KEY = {
  LATEST: `GHXI/LATEST`,
  PC: `GHXI/PC`,
  ANDROID: `GHXI/ANDROID`
}

export const GHXI_QUEUE_NAME = `果核剥壳` as const

export const GHXI_JOB_DEFINE = {
  LATEST: {
    KEY: `最新更新`,
    NAME: `最新更新`,
    SCOPE: `果核剥壳/最新更新`,
    CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
  },
  PC: {
    KEY: `电脑软件`,
    NAME: `电脑软件`,
    SCOPE: `果核剥壳/电脑软件`,
    CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
  },
  ANDROID: {
    KEY: `安卓软件`,
    NAME: `安卓软件`,
    SCOPE: `果核剥壳/安卓软件`,
    CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
  }
}
