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
export class AcFunTask {}
