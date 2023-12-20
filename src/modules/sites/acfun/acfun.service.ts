import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AcFunEntity } from './acfun.entity'
import { Repository } from 'typeorm'
import { RedisService } from 'src/shared/redis.service'
import { FetchService } from 'src/shared/fetch.service'
import { ACFUN_API, ACFUN_CACHE_KEY, ACFUN_CACHE_TTL } from './acfun.constant'
import { genUserAgent } from 'src/helpers'
import {
  AcFunItem,
  OriginAcFunRankItem,
  OriginAcFunRankResponse
} from './acfun.type'

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

    const items = this.transformFields(response.data.rankList)

    return items
  }

  public async fetchThreeDays() {
    const payload = {
      ...this.payload,
      rankPeriod: 'THREE_DAYS'
    }

    const response = await this.fetchService.get<OriginAcFunRankResponse>(
      ACFUN_API.RANK.THREE_DAYS,
      {
        params: payload,
        headers: this.headers
      }
    )

    const items = this.transformFields(response.data.rankList)

    return items
  }

  public async fetchWeek() {
    const payload = {
      ...this.payload,
      rankPeriod: 'WEEK'
    }

    const response = await this.fetchService.get<OriginAcFunRankResponse>(
      ACFUN_API.RANK.WEEK,
      {
        params: payload,
        headers: this.headers
      }
    )

    const items = this.transformFields(response.data.rankList)

    return items
  }

  public transformFields(items: OriginAcFunRankItem[]): AcFunItem[] {
    return items.map((item) => {
      return {
        id: item.contentId,
        title: item.title,
        caption: item.description || item.contentDesc || '',
        originUrl: 'https://www.acfun.cn/v/ac' + item.contentId,
        thumbnailUrl: item.coverUrl || item.videoCover,
        duration: item.duration,
        publishedDate: item.contributeTime || item.createTimeMillis,
        user: {
          id: item.userId || item.user.id,
          name: item.user.name || item.userName,
          avatarUrl: item.userImg || item.user.headUrl,
          stats: {
            following: item.user.followingCountValue,
            fanCount: item.user.fanCountValue,
            contribute: item.user.contributeCountValue
          }
        },
        stats: {
          view: item.viewCount,
          like: item.likeCount,
          comment: item.commentCount,
          collect: item.stowCount,
          danmu: item.danmuCount || item.danmakuCount
        },
        tags: item.tagList
      }
    })
  }
}
