import { Injectable } from '@nestjs/common'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'
import { AGEFANS_API } from './agefans.constant'
import { genUserAgent } from 'src/helpers'

@Injectable()
export class AgefansService {
  private readonly headers = {
    'User-Agent': genUserAgent('mobile')
  }

  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  public async latest(page: number = 1, size: number = 10) {
    const response = await this.fetchService.get(AGEFANS_API.LATEST, {
      headers: this.headers,
      params: { page, size }
    })

    return response.data
  }

  public async comment(cid: number, page: number = 1) {
    const params = {
      page
    }
    const response = await this.fetchService.get(
      `${AGEFANS_API.COMMENT}/${cid}`,
      {
        headers: this.headers,
        params
      }
    )

    return response.data
  }

  public async detail(cid: number) {
    const response = await this.fetchService.get(
      `${AGEFANS_API.DETAIL}/${cid}`,
      { headers: this.headers }
    )

    return response.data
  }

  public async category(query: {
    genre: string
    label: string
    letter: string
    order: string
    region: string
    resource: string
    season: string
    status: string
    year: string
    page: number
    size: number
  }) {
    const _query = {
      genre: 'all',
      label: '后宫',
      letter: 'all',
      order: 'time',
      region: '日本',
      resource: 'all',
      season: 'all',
      status: '完结',
      year: 'all',
      page: 1,
      size: 10
    }
    const response = await this.fetchService.get(AGEFANS_API.CATEGORY, {
      headers: this.headers,
      params: { ..._query }
    })
    return response.data
  }
}
