export enum WEIBO_API {
  VERIFY_CODE = `https://api.weibo.cn/2/account/login_sendcode`,
  LOGIN = `https://api.weibo.cn/2/account/login`,
  HOT_SEARCH = `https://weibo.com/ajax/side/hotSearch`,
  NEWS = `https://weibo.com/ajax/statuses/news`,
  ENTRANK = `https://weibo.com/ajax/statuses/entertainment`,
  TOPIC_BAND = `https://weibo.com/ajax/statuses/topic_band`
}
export enum WEIBO_CACHE_KEY {
  VERIFY_CODE = `WEIBO/VERIFY_CODE`,
  COOKIE = `WEIBO/COOKIE`,
  HOT_SEARCH = `WEIBO/HOT_SEARCH`,
  NEWS = `WEIBO/NEWS`,
  ENTRANK = `WEIBO/ENTRANK`,
  TOPIC_BAND = `WEIBO/TOPIC_BAND`
}

export const WEIBO_COOKIE_DOMAIN = `.weibo.cn` as const
