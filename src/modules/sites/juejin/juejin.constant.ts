export enum JUEJIN_API {
  //? 榜单
  ARTICLE = `https://api.juejin.cn/content_api/v1/content/article_rank?spider=0`,
  //? 专栏
  COLUMN = `https://api.juejin.cn/content_api/v1/column/selected_rank?spider=0`,
  //? 推荐收藏
  REC_COLLECT = `https://api.juejin.cn/interact_api/v2/collectionset/collection_recommend_rank?spider=0`,
  //? 优质作者榜
  AUTHOR = `https://api.juejin.cn/user_api/v1/quality_user/rank`
}

export enum JUEJIN_ARTICLE_TYPE {
  HOT = 'hot',
  COLLECT = 'collect'
}
export enum JUEJIN_ARTICLE_CATEGORY {
  MIX = `1`,
  BE = `6809637769959178254`,
  FE = `6809637767543259144`,
  ANDROID = `6809635626879549454`,
  IOS = `6809635626661445640`,
  AI = `6809637773935378440`,
  DEVELOP = `6809637771511070734`,
  CODE = `6809637776263217160`,
  READ = `6809637772874219534`
}

export enum JUEJIN_AUTHOR_CATEGORY {
  BE = `6809637769959178254`,
  FE = `6809637767543259144`,
  CLIENT = `6809635626879549454`,
  AI = `6809637773935378440`,
  DEVELOP = `6809637771511070734`,
  CODE = `6809637776263217160`,
  READ = `6809637772874219534`
}
//? 优质作者榜 周榜/月榜
export enum JUEJIN_AUTHOR_TYPE {
  WEEK = 1,
  MONTH = 2
}

export enum JUEJIN_CACHE_KEY {
  ARTICLE = `JUEJIN/RANK`,
  COLUMN = `JUEJIN/COLUMN`,
  REC_COLLECT = `JUEJIN/REC_COLLECT`,
  AUTHOR = `JUEJIN/AUTHOR`,
  ARTICLE_COLLECT = `JUEJIN/ARTICLE_COLLE`
}

export const JUEJIN_QUEUE_NAME = `掘金（施工中...）` as const

export const JUEJIN_JOB_DEFINE = {}
