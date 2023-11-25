import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AcFunEntity } from './acfun.entity'
import { Repository } from 'typeorm'
import { RedisService } from 'src/shared/redis.service'
import { FetchService } from 'src/shared/fetch.service'
import { ACFUN_API, ACFUN_CACHE_KEY, ACFUN_CACHE_TTL } from './acfun.constant'
import { genUserAgent } from 'src/helpers'
import { OriginAcFunRankResponse } from './acfun.type'

@Injectable()
export class AcFunService {
  private readonly logger: Logger = new Logger(AcFunService.name)
  private readonly headers: {} = {
    'User-Agent': genUserAgent('desktop')
  }
  private readonly proxy: {} = {}
  private readonly payload: {} = {
    channelId: '',
    subChannelId: '',
    rankLimit: 30
  }

  constructor(
    @InjectRepository(AcFunEntity)
    private readonly repo: Repository<AcFunEntity>,
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  public async fetchDay() {
    this.logger.log('day')

    const payload = {
      ...this.payload,
      rankPeriod: 'DAY'
    }

    const response = await this.fetchService.get<OriginAcFunRankResponse>(
      ACFUN_API.RANK.DAY,
      {
        params: payload,
        headers: this.headers
      }
    )

    const data = response.data.rankList.map((item) => {
      return item
    })

    return data
  }
}
