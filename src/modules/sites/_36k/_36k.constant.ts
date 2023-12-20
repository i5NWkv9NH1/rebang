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

export const _36K_QUEUE_NAME = `36氪` as const

export const _36K_JOB_DEFINE = {
  LATEST: {
    KEY: '最新',
    NAME: '最新',
    SCOPE: '36氪/最新',
    CRON: CronExpression.EVERY_5_MINUTES
  },
  RANK: {
    HOT: {
      KEY: '人气榜',
      NAME: '人气榜',
      SCOPE: '36氪/榜单/人气榜',
      CRON: CronExpression.EVERY_5_MINUTES
    },
    VIDEO: {
      KEY: '视频榜',
      NAME: '视频榜',
      SCOPE: '36氪/榜单/视频榜',
      CRON: CronExpression.EVERY_5_MINUTES
    },
    COMMENT: {
      KEY: '热议榜',
      NAME: '热议榜',
      SCOPE: '36氪/榜单/热议榜',
      CRON: CronExpression.EVERY_5_MINUTES
    },
    COLLECT: {
      KEY: '收藏榜',
      NAME: '收藏榜',
      SCOPE: '36氪/榜单/收藏榜',
      CRON: CronExpression.EVERY_5_MINUTES
    }
  },
  *[Symbol.iterator]() {
    for (let key in this) {
      yield [key, this[key]]
    }
  }
}

// export const _36K_JOB_DEFINE = {
//   LATEST: {
//     KEY: 'latest',
//     NAME: '36氪/最新',
//     CRON: CronExpression.EVERY_5_MINUTES
//   },
//   RANK: {
//     HOT: {
//       KEY: 'rank-hot',
//       NAME: '36氪/榜单/人气榜',
//       CRON: CronExpression.EVERY_5_MINUTES
//     },
//     VIDEO: {
//       KEY: 'rank-video',
//       NAME: '36氪/榜单/视频榜',
//       CRON: CronExpression.EVERY_5_MINUTES
//     },
//     COMMENT: {
//       KEY: 'rank-comment',
//       NAME: '36氪/榜单/热议榜',
//       CRON: CronExpression.EVERY_5_MINUTES
//     },
//     COLLECT: {
//       KEY: 'rank-collect',
//       NAME: '36氪/榜单/收藏榜',
//       CRON: CronExpression.EVERY_5_MINUTES
//     }
//   },
//   *[Symbol.iterator]() {
//     for (let key in this) {
//       yield [key, this[key]]
//     }
//   }
// }
