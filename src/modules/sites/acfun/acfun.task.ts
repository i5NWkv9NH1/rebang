import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Cron, CronExpression, Timeout } from '@nestjs/schedule'
import {
  ACFUN_CACHE_KEY,
  ACFUN_CACHE_TTL,
  ACFUN_CRON,
  ACFUN_TASK
} from './acfun.constant'
import { AcFunService } from './acfun.service'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class AcFunTask implements OnModuleInit {
  private readonly logger = new Logger(AcFunTask.name)

  constructor(
    private readonly acFunService: AcFunService,
    private readonly redisService: RedisService
  ) {}

  async onModuleInit() {
    await Promise.all([
      // this.defineDayTask(),
      // this.defineThreeDaysTask(),
      // this.defineWeekTask()
    ])
  }

  // @Cron(CronExpression.EVERY_10_SECONDS, { name: ACFUN_TASK.RANK.DAY })
  public async defineDayTask() {
    // const data = await this.acFunService.fetchDay()
    // await this.redisService.set(
    //   ACFUN_CACHE_KEY.RANK.DAY,
    //   data,
    //   ACFUN_CACHE_TTL.RANK.DAY
    // )
    console.log('day')
  }
  // @Cron(CronExpression.EVERY_10_SECONDS, { name: ACFUN_TASK.RANK.THREE_DAYS })
  public async defineThreeDaysTask() {
    console.log('three days')
  }
  // @Cron(CronExpression.EVERY_10_SECONDS, { name: ACFUN_TASK.RANK.WEEK })
  public async defineWeekTask() {
    console.log('week')
  }
}
