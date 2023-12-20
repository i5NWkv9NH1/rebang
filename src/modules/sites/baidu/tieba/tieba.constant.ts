import { CronExpression } from '@nestjs/schedule'

export enum TIEBA_API {
  TOPIC_LIST = `https://tieba.baidu.com/hottopic/browse/topicList`
}
export const TIEBA_CACHE_KEY = {
  TOPIC_LIST: `TIEBA/TOPIC_LIST`
}
export const TIEBA_QUEUE_NAME = `百度贴吧` as const

export const TIEBA_JOB_DEFINE = {
  TOPIC_LIST: {
    KEY: `热议榜`,
    NAME: `热议榜`,
    SCOPE: `百度贴吧/热议榜`,
    CRON: CronExpression.EVERY_HOUR
  }
}
