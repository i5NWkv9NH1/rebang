import { CronExpression } from '@nestjs/schedule'

export const ZHIHU_QUEUE = `zhihu` as const
export const ZHIHU_PAGE = `zhihu` as const
export const ZHIHU_REDIS_EXPIRE = 5 * 60
export const ZHIHU_REDIS_KEY = 'db:zhihu:trend' as const
export enum ZhihuAPI {
  Trend = `https://www.zhihu.com/billboard`
}
export enum ZhihuJobName {
  Trend = 'Trend'
}

export enum ZhihuJobCron {
  Trend = CronExpression.EVERY_5_MINUTES
}
