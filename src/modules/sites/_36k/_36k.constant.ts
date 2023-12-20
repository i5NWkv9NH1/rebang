import { CronExpression } from '@nestjs/schedule'

export const _36K_API = {
  LATEST: {
    PAGE_CALL_BACK: `https://www.36kr.com/information/web_news/`,
    PAGINATE_WEB: `https://gateway.36kr.com/api/mis/nav/ifm/subNav/flow`,
    PAGINATE_WAP: `https://gateway.36kr.com/api/mis/nav/home/flow/forWap`
  },
  RANK: {
    HOT: `https://gateway.36kr.com/api/mis/nav/home/nav/rank/hot`,
    VIDEO: `https://gateway.36kr.com/api/mis/nav/home/nav/rank/video`,
    COMMENT: `https://gateway.36kr.com/api/mis/nav/home/nav/rank/comment`,
    COLLECT: `https://gateway.36kr.com/api/mis/nav/home/nav/rank/collect`
  }
}
export const _36K_CACHE_KEY = {
  LATEST: `36K/LATEST`,
  RANK: {
    HOT: `36K/RANK/HOT`,
    VIDEO: `36K/RANK/VIDEO`,
    COMMENT: `36K/RANK/COMMENT`,
    COLLECT: `36K/RANK/COLLECT`
  }
}

export const _36K_CRON = {
  RANK: {
    HOT: {
      NAME: '36氪/榜单/人气榜',
      VALUE: CronExpression.EVERY_5_MINUTES
    },
    VIDEO: {
      NAME: '36氪/榜单/视频榜',
      VALUE: CronExpression.EVERY_5_MINUTES
    },
    COMMENT: {
      NAME: '36氪/榜单/热议榜',
      VALUE: CronExpression.EVERY_5_MINUTES
    },
    COLLECT: {
      NAME: '36氪/榜单/收藏榜',
      VALUE: CronExpression.EVERY_5_MINUTES
    }
  }
}
