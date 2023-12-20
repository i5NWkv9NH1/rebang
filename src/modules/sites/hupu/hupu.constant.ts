import { CronExpression } from '@nestjs/schedule'

export const HUPU_API = {
  SPORTS: `https://bbs.hupu.com/all-sports`,
  GAMBIA: `https://bbs.hupu.com/all-gambia`,
  ENT: `https://bbs.hupu.com/all-ent`,
  LOL: `https://bbs.hupu.com/all-lol`,
  GAME: `https://bbs.hupu.com/all-gg`,
  GEAR: `https://bbs.hupu.com/all-gear`,
  DIGITAL: `https://bbs.hupu.com/all-digital`,
  SOCCER: `https://bbs.hupu.com/all-soccer`
}

export enum HUPU_TABS {
  GAMBIA = `gambia`,
  SPORTS = `sports`,
  ENT = `ent`,
  LOL = `lol`,
  GAME = `gg`,
  GEAR = `gear`,
  DIGITAL = `digital`,
  SOCCER = `soccer`
}

export const HUPU_CACHE_KEY = {
  PLATE: `HUPU/PLATE`,
  GAMBIA: `HUPU/GAMBIA`
}

export const HUPU_QUEUE_NAME = `虎扑（施工中...）` as const

export const HUPU_JOB_DEFINE = {
  GAMBIA: {
    KEY: `步行街`,
    NAME: `步行街`,
    SCOPE: `虎扑/步行街`,
    CRON: CronExpression.EVERY_5_MINUTES
  }
}
