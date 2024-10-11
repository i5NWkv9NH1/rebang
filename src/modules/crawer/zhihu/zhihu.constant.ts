import { CronExpression } from '@nestjs/schedule'

export const ZHIHU_QUEUE_NAME = `zhihu` as const
export const ZHIHU_INDEX_NAME = `zhihu` as const

export enum ZhihuAPI {
  Trend = `https://www.zhihu.com/billboard`
}
export enum ZhihuRedisExpire {
  Trend = 5 * 60
}
export enum ZhihuRedisKey {
  Trend = 'db:zhihu:Trend'
}
export enum ZhihuJobName {
  Trend = 'Trend'
}
export enum ZhihuJobCron {
  Trend = CronExpression.EVERY_5_MINUTES
}
