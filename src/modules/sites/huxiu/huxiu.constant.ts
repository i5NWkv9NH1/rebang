import { CronExpression } from '@nestjs/schedule'

export enum HUXIU_API {
  LATEST = `https://api-article.huxiu.com/web/article/articleList`,
  TIMELINE = `https://moment-api.huxiu.com/web-v2/moment/feed`,
  EVENT = `https://api-ms-event.huxiu.com/v1/eventList`
}
export const HUXIU_CACHE_KEY = {
  LATEST: `HUXIU/LATEST`,
  TIMELINE: `HUXIU/TIMELINE`,
  EVENT: `HUXIU/EVENT`
}

export const HUXIU_QUEUE_NAME = `虎嗅` as const

export const HUXIU_JOB_DEFINE = {
  LATEST: {
    KEY: `最新`,
    NAME: `最新`,
    SCOPE: `虎嗅/最新`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  TIMELINE: {
    KEY: `7x24`,
    NAME: `7x24`,
    SCOPE: `虎嗅/7x24`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  EVENT: {
    KEY: `号外`,
    NAME: `号外`,
    SCOPE: `虎嗅/号外`,
    CRON: CronExpression.EVERY_5_MINUTES
  }
}
