import { CronExpression } from '@nestjs/schedule'

export enum SSP_API {
  HOT = `https://sspai.com/api/v1/article/tag/page/get`,
  RECOMMENT = `https://sspai.com/api/v1/article/index/page/get`
}

export const SSP_CACHE_KEY = {
  HOT: `SSP/HOT`,
  RECOMMENT: `SSP/RECOMMENT`
}

export const SSP_QUEUE_NAME = `少数派`

export const SSP_JOB_DEFINE = {
  HOT: {
    KEY: `热门`,
    NAME: `热门`,
    SCOPE: `少数派/热门`,
    CRON: CronExpression.EVERY_HOUR
  },
  RECOMMENT: {
    KEY: `推荐`,
    NAME: `推荐`,
    SCOPE: `少数派/推荐`,
    CRON: CronExpression.EVERY_HOUR
  }
}
