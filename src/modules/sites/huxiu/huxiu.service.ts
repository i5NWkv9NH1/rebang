import { Injectable, Logger } from '@nestjs/common'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'
import {
  HuxiuEventItem,
  HuxiuLatestItem,
  HuxiuTimelineItem,
  OriginHuxiuEventItem,
  OriginHuxiuLatestItem,
  OriginHuxiuPaginationResponse,
  OriginHuxiuTimelineItem,
  OriginHuxiuTimelineResponse
} from './huxiu.type'
import { genUserAgent } from 'src/helpers'
import { HUXIU_API } from './huxiu.constant'

//TODO: paginate
//TODO: channel
@Injectable()
export class HuxiuService {
  private readonly logger = new Logger(HuxiuService.name)
  private readonly headers = {
    'Uesr-Agent': genUserAgent('desktop'),
    Origin: 'https://www.huxiu.com',
    Referer: 'https://www.huxiu.com/'
  }

  constructor(
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  //#region 最新
  public async latest() {
    const url = HUXIU_API.LATEST
    const currentTimestamp = Math.ceil(new Date().getTime() / 1000)
    const pageSize = 22

    const params = {
      platform: 'www',
      recommend_time: `${currentTimestamp}`,
      pageSize: `${pageSize}`
    }

    const response = await this.fetchService.get<OriginHuxiuPaginationResponse>(
      url,
      {
        headers: this.headers,
        params
      }
    )
    const items = this.transformLatestItems(response.data.data.dataList).filter(
      (item) => !item.status.sponsor
    )
    const meta = {
      currentPage: response.data.data.cur_page,
      pageSize: response.data.data.pagesize,
      hasNextPage: response.data.data.is_have_next_page,
      totalPage: response.data.data.total,
      totalPageSize: response.data.data.total_page,
      lastFetchTimestamp: response.data.data.last_dateline
    }

    const data = { items, meta }

    return data
  }
  //#endregion

  //#region 7x24
  public async timeline() {
    const cache = await this.redisService.get('huxiu/timeline')
    if (cache) return cache

    const url = HUXIU_API.TIMELINE
    const params = {
      platform: 'www',
      last_dateline: '',
      is_ai: 0
    }

    const response = await this.fetchService.get<OriginHuxiuTimelineResponse>(
      url,
      {
        headers: this.headers,
        params
      }
    )
    const items = response.data.data.moment_list.datalist.map((item) => {
      return {
        date: item.time,
        items: this.transformTimelineItems(item.datalist)
      }
    })
    const data = {
      items,
      meta: {
        currentPage: response.data.data.moment_list.cur_page,
        pageSize: response.data.data.moment_list.pagesize,
        totalPageSize: response.data.data.moment_list.total,
        totalPage: response.data.data.moment_list.total_page,
        lastFetchTimestamp: response.data.data.moment_list.last_dateline
      }
    }

    return data
  }
  //#endregion

  //#region 号外
  public async event() {
    const url = HUXIU_API.EVENT
    const pageSize = 22

    const params = {
      platform: 'www',
      pageSize: `${pageSize}`
    }

    const response = await this.fetchService.get<OriginHuxiuPaginationResponse>(
      url,
      {
        headers: this.headers,
        params
      }
    )
    const items = this.transformEventItems(response.data.data.datalist).filter(
      (item) => !item.status.sponsor
    )
    const meta = {
      currentPage: response.data.data.cur_page,
      pageSize: response.data.data.pagesize,
      totalPage: response.data.data.total,
      totalPageSize: response.data.data.total_page
    }

    const data = { items, meta }

    return data
  }
  //#endregion

  public transformLatestItems(
    items: OriginHuxiuLatestItem[]
  ): HuxiuLatestItem[] {
    return items.map((item) => {
      return {
        id: item.aid,
        title: item.title,
        caption: item.summary,
        originUrl: 'https://huxiu/article/' + item.aid,
        thumbnailUrl: item.origin_pic_path,
        publishedDate: +(item.dateline + '000'),
        formatDate: item.formatDate,
        author: {
          id: item.user_info.uid,
          name: item.user_info.username,
          avatarUrl: item.user_info.avatar,
          desc: item.user_info.yijuhua,
          tag: item.user_info.position
        },
        status: {
          hot: item.is_hot,
          audio: !!item.is_audio,
          free: !!item.is_free,
          sponsor: !!item.is_sponsor,
          original: !!item.is_original
        },
        stats: {
          view: item.count_info.viewnum,
          comment: item.count_info.commentnum,
          reply: item.count_info.reply_num,
          like: item.count_info.favtimes,
          agree: item.count_info.agree,
          disagree: item.count_info.disagree,
          share: item.count_info.sharetimes,
          reward: +item.count_info.rewardnum
        }
      }
    })
  }

  public transformEventItems(items: OriginHuxiuEventItem[]): HuxiuEventItem[] {
    return items.map((item) => {
      return {
        id: item.event_id,
        title: item.name,
        caption: item.introduce,
        thumbnailUrl: item.cover_path,
        originUrl: 'https://www.huxiu.com/event/' + item.event_id,
        publishedDate: +(item.publish_time + '000'),
        stats: {
          view: item.multiple_view_num,
          join: item.join_person_num
        },
        status: {
          sponsor: item.sponsor_name === '广告'
        }
      }
    })
  }

  public transformTimelineItems(
    items: OriginHuxiuTimelineItem[]
  ): HuxiuTimelineItem[] {
    return items.map((item) => {
      return {
        id: item.object_id,
        title: item.content,
        originUrl: 'https://huxiu.com/moment/' + item.object_id,
        thumbnailUrl: '',
        publishedDate: +(item.publish_time + '000'),
        status: {
          ai: item.is_ai,
          ad: item.is_ad
        },
        stats: {
          comment: item.comment_num,
          like: item.favorite_num,
          agree: item.agree_num
        }
      }
    })
  }
}
