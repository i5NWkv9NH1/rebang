import { CronExpression } from '@nestjs/schedule'

export const BILIBILI_QUEUE_NAME = `bilibili` as const
export const BILIBILI_INDEX_NAME = `bilibili` as const
export enum BilibiliApi {
  //* 全站日榜
  Rank = `https://api.bilibili.com/x/web-interface/ranking/v2`,
  //* 每周必看
  Week = `https://app.bilibili.com/x/v2/show/popular/selected?number=289&type=weekly_selected`,
  //* 综合热门
  Hot = `https://api.bilibili.com/x/web-interface/wx/hot?ps=100&pn=1&teenage_mode=0`,
  //* 入站必刷
  Rec = `https://app.bilibili.com/x/v2/show/popular/good_history`,
  //* 热搜
  Search = `https://api.bilibili.com/x/web-interface/wbi/search/square?limit=50`,
  //* 会员购
  Shop = `https://mall.bilibili.com/mall-c-search/home/new_items/list`
}
export enum BilibiliRedisExpire {
  Rank = 5 * 60,
  Week = 5 * 60,
  Hot = 5 * 60,
  Rec = 5 * 60,
  Search = 5 * 60,
  Shop = 5 * 60
}
export enum BilibiliRedisKey {
  Rank = `db:哔哩哔哩:全站日榜`,
  Week = `db:哔哩哔哩:每周必看`,
  Hot = `db:哔哩哔哩:综合热门`,
  Rec = `db:哔哩哔哩:入站必刷`,
  Search = `db:哔哩哔哩:热搜`,
  Shop = `db:哔哩哔哩:会员购`
}

export enum BilibiliJobName {
  Rank = `bilibili-rank`,
  Week = `bilibili-week`,
  Hot = `bilibili-hot`,
  Rec = `bilibili-rec`,
  Search = `bilibili-search`,
  Shop = `bilibili-shop`
}
export enum BilibiliJobCron {
  Rank = CronExpression.EVERY_5_MINUTES,
  Week = CronExpression.EVERY_5_MINUTES,
  Hot = CronExpression.EVERY_5_MINUTES,
  Rec = CronExpression.EVERY_5_MINUTES,
  Search = CronExpression.EVERY_5_MINUTES,
  Shop = CronExpression.EVERY_5_MINUTES
}
