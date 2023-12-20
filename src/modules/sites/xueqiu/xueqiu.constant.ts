export enum XUEQIU_API {
  HOT_STOCK = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json`,
  NOTICE = `https://xueqiu.com/query/v1/status/hots.json`,
  NEWS = `https://xueqiu.com/query/v1/status/hots.json`,
  DAY = `https://xueqiu.com/statuses/livenews/list.json`
}
export const XUEQIU_CACHE_KEY = {
  COOKIE: 'XUEQIU/COOKIE'
}

export const XUEQIU_QUEUE_NAME = `雪球（施工中...）` as const

export const XUEQIU_JOB_DEFINE = {}
