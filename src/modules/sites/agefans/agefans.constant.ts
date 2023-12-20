import { CronExpression } from '@nestjs/schedule'

export enum AGEFANS_API {
  BASE_URL = `https://web.age-spa.com:8443/`,
  LATEST = `https://ageapi.omwjhz.com:18888/v2/update`,
  DETAIL = `https://ageapi.omwjhz.com:18888/v2/detail`,
  CATEGORY = `https://ageapi.omwjhz.com:18888/v2/catalog`,
  COMMENT = `https://ageapi.omwjhz.com:18888/v2/comment`
}

export const AGEFANS_CACHE_KEY = {
  LATEST: `AGEFANS/LATEST`
}
export const AGEFANS_QUEUE_NAME = `Agefans` as const

export const AGEFANS_JOB_DEFINE = {
  LATEST: {
    KEY: `最新更新`,
    NAME: `最新更新`,
    SCOPE: `Agefans/最新更新`,
    CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
  }
}
