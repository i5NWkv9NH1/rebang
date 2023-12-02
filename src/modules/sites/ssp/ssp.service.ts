import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { SSP_API } from './ssp.constant'
import { OriginSspItem, OriginSspPaginationResponse } from './ssp.type'
import { SspItem } from './ssp.type'

//TODO: paginate
@Injectable()
export class SspService {
  private readonly logger = new Logger(SspService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('mobile')
  }

  constructor(private readonly fetchService: FetchService) {}

  public async hot() {
    const params = {
      limit: 10,
      offset: 0,
      created_at: Math.ceil(new Date().getTime() / 1000),
      tag: '热门文章',
      released: false
    }
    const url = SSP_API.HOT
    const response = await this.fetchService.get<OriginSspPaginationResponse>(
      url,
      { headers: this.headers, params }
    )

    const items = this.transformItems(response.data.data)
    return items
  }

  public async recomment() {
    const params = { limit: 10, offset: 0, created_at: 0 }

    const url = SSP_API.RECOMMENT
    const response = await this.fetchService.get<OriginSspPaginationResponse>(
      url,
      { headers: this.headers, params }
    )

    const items = this.transformItems(response.data.data)
    return items
  }

  public transformItems(items: OriginSspItem[]): SspItem[] {
    return items.map((item) => {
      const originUrl = 'https://sspai.com/post/' + item.id
      const caption = item.summary
      const thumbnailUrl = item.banner
      const stats = {
        view: item.view_count,
        like: item.like_count,
        comment: item.comment_count
      }
      const author = {
        id: item.author.id,
        name: item.author.nickname,
        avatarUrl: item.author.avatar
      }
      const status = {
        free: item.free
      }

      return {
        id: item.id,
        title: item.title,
        publishedDate: +(item.created_time + '000'),
        originUrl,
        caption,
        thumbnailUrl,
        stats,
        author,
        status
      }
    })
  }

  public getSpeciTime(time = '18:18') {
    const today = new Date()
    const [hour, mins] = time.split(':')
    today.setHours(+hour)
    today.setMinutes(+mins)

    return today
  }
}
