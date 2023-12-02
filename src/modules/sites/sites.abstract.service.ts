import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'
import { SiteAbstractEntity } from './site.abstract.entity'
import { Repository } from 'typeorm'

@Injectable()
export abstract class SiteAbstractService {
  private readonly logger = new Logger(SiteAbstractService.name)

  constructor(
    @InjectRepository(SiteAbstractEntity)
    private readonly repo: Repository<SiteAbstractEntity>,

    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}
}
