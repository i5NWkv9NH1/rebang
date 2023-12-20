import { CronExpression } from '@nestjs/schedule'

export enum JIANDAN_API {
  _3D = `https://jandan.net/top-3days`,
  _7D = `https://jandan.net/top-7days`,
  _4H = `https://jandan.net/top-4h`,
  TUCAO = 'https://jandan.net/top-tucao',
  TOP = 'https://jandan.net/top',
  OOXX = 'https://jandan.net/top-ooxx',
  COMMENTS = 'https://jandan.net/top-comments'
}
export enum JIANDAN_CACHE_KEY {
  _3D = 'JIANDAN_3D',
  _7D = 'JIANDAN_3D',
  _4H = 'JIANDAN_3D',
  TUCAO = 'JIANDAN_TUCAO',
  TOP = 'JIANDAN_TOP',
  OOXX = 'JIANDAN_OOXX',
  COMMENTS = 'JIANDAN_COMMENTS'
}

export const JIANDAN_QUEUE_NAME = `煎蛋网` as const

export const JIANDAN_JOB_DEFINE = {
  _3D: {
    KEY: `三天`,
    NAME: `三天`,
    SCOPE: `煎蛋网/三天`,
    CRON: CronExpression.EVERY_DAY_AT_MIDNIGHT
  },
  _7D: {
    KEY: `七天`,
    NAME: `七天`,
    SCOPE: `煎蛋网/七天`,
    CRON: CronExpression.EVERY_WEEK
  },
  _4H: {
    KEY: `4小时`,
    NAME: `4小时`,
    SCOPE: `煎蛋网/4小时`,
    CRON: CronExpression.EVERY_4_HOURS
  },
  TUCAO: {
    KEY: `吐槽`,
    NAME: `吐槽`,
    SCOPE: `煎蛋网/吐槽`,
    CRON: CronExpression.EVERY_HOUR
  },
  TOP: {
    KEY: `无聊图`,
    NAME: `无聊图`,
    SCOPE: `煎蛋网/无聊图`,
    CRON: CronExpression.EVERY_HOUR
  },
  OOXX: {
    KEY: `随手拍`,
    NAME: `随手拍`,
    SCOPE: `煎蛋网/随手拍`,
    CRON: CronExpression.EVERY_HOUR
  },
  COMMENTS: {
    KEY: `树洞`,
    NAME: `树洞`,
    SCOPE: `煎蛋网/树洞`,
    CRON: CronExpression.EVERY_HOUR
  }
}
