import { CronExpression } from '@nestjs/schedule'

export enum TENCENT_NEWS_API {
  HOT_QUESTION_LIST = `https://i.news.qq.com/web_backend/getHotQuestionList`,
  HOT_RANK_LIST = `https://r.inews.qq.com/gw/event/pc_hot_ranking_list?ids_hash=&offset=0&page_size=50&appver=15.5_qqnews_7.1.60`
}

export const TENCENT_NEWS_CACHE_KEY = {
  HOT_QUESTION_LIST: `TENCENT_NEWS/HOT_QUESTION_LIST`,
  HOT_RANK_LIST: `TENCENT_NEWS/HOT_RANK_LIST`
}

export const TENCENT_NEWS_QUEUE_NAME = `腾讯新闻` as const

export const TENCENT_NEWS_JOB_DEFINE = {
  HOT_QUESTION_LIST: {
    KEY: `热问`,
    NAME: `热问`,
    SCOPE: `腾讯新闻/热问`,
    CRON: CronExpression.EVERY_HOUR
  },
  HOT_RANK_LIST: {
    KEY: `热榜`,
    NAME: `热榜`,
    SCOPE: `腾讯新闻/热榜`,
    CRON: CronExpression.EVERY_HOUR
  }
}
