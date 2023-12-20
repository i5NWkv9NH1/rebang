export enum YICAI_API {
  RANK = `https://www.yicai.com/api/ajax/getranklistbykeys?keys=newsRank%2CvideoRank%2CimageRank%2CliveRank`,
  TOUTIAO = `https://www.yicai.com/api/ajax/getlistbycid?cid=48&type=1&page=2&pagesize=30`,
  LATEST = `https://www.yicai.com/api/ajax/getlatest?page=2&pagesize=30`
}

export const YICAI_CACHE_KEY = {
  RANK: `YICAI/RANK`,
  TOUTIAO: `YICAI/RANK`,
  LATEST: `YICAI/RANK`
}
export const YICAI_QUEUE_NAME = `第一财经（施工中...）` as const
export const YICAI_JOB_DEFINE = {}
