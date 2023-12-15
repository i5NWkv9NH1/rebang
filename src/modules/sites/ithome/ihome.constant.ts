export enum ITHOME_API {
  //? 获取所有菜单和接口
  MENUS = `https://napi.ithome.com/api/topmenu/getall?platform=ithome_ios&appver=877`,
  LATEST = `https://napi.ithome.com/api/topmenu/gethomefeeds?topmenuId=101`,
  HOT = `https://napi.ithome.com/api/news/gethotbang`,
  COMMENT = `https://cmt.ithome.com/apiv2/comment/hotcommentfeed?_=1`
  //?
}

export const ITHOME_CACHE_KEY = {
  BOOTSTRAP: 'ITHOME',
  HOT: 'ITHOME/HOT',
  DAY: 'ITHOME/DAY',
  WEEK: 'ITHOME/WEEK',
  MONTH: 'ITHOME/MONTH',

  MENUS: `ITHOME/MENUS`
}

export enum ITHOME_TABS {
  HOT = 'hot',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month'
}
