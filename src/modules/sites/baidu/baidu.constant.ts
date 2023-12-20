import { CronExpression } from '@nestjs/schedule'

export enum BaiduRankTab {
  REALTIME = 'realtime',
  NOVEL = 'novel',
  MOVIE = 'movie',
  TELEPLAY = 'teleplay',
  CAR = 'car',
  GAME = 'game'
}

export enum BAIDU_API {
  HOT = `https://mbd.baidu.com/searchbox?action=feed&cmd=100&ds_lv=4&matrixstyle=0&mps=2861144997&mpv=1&network=1_0&osbranch=i0&osname=baiduboxapp&service=bdbox&st=0&ua=1125_2436_iphone_13.47.0.10_0&uid=135CE29F819AB4494986C77534E0E22AAA410BAB6OBKMFRLNSC&zid=A3h3Vz4-GScAAAACVAP6Am8BawJl8SAg_HZleDxFBVAKWgsMDQ4HWA1dW1taB19cCAwKClsPW1wIXVhdWg8LClgZBR4TAAAAAGV8Pz4QEDM&refresh=0&imgtype=webp&refresh_state=4&channel_id=2147483647`
}

export const BAIDU_CACHE_KEY = {
  REALTIME: `BAIDU/REALTIME`,
  NOVEL: `BAIDU/NOVEL`,
  MOVIE: `BAIDU/MOVIE`,
  TELEPLAY: `BAIDU/TELEPLAY`,
  CAR: `BAIDU/CAR`,
  GAME: `BAIDU/GAME`
}

export const BAIDU_QUEUE_NAME = `百度（施工中...）` as const

export const BAIDU_JOB_DEFINE = {
  REALTIME: {
    KEY: `热搜`,
    NAME: `热搜`,
    SCOPE: `百度/热搜`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  NOVEL: {
    KEY: `小说`,
    NAME: `小说`,
    SCOPE: `百度/小说`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  MOVIE: {
    KEY: `电影`,
    NAME: `电影`,
    SCOPE: `百度/电影`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  TELEPLAY: {
    KEY: `电视剧`,
    NAME: `电视剧`,
    SCOPE: `百度/电视剧`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  CAR: {
    KEY: `汽车`,
    NAME: `汽车`,
    SCOPE: `百度/汽车`,
    CRON: CronExpression.EVERY_5_MINUTES
  },
  GAME: {
    KEY: `游戏`,
    NAME: `游戏`,
    SCOPE: `百度/游戏`,
    CRON: CronExpression.EVERY_5_MINUTES
  }
}
