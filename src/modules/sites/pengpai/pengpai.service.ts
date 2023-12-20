import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'
import {
  OriginPengpaiChannelResponse,
  OriginPengpaiHotRespones,
  OriginPengpaiItem,
  OriginPengpaiNodeResponse
} from './pengpai.type'
import { PengpaiChannelDto, PengpaiNodeDto } from './pengpai.dto'
import { PENGPAI_API, PENGPAI_CACHE_KEY } from './pengpai.constant'

@Injectable()
export class PengpaiService {
  private readonly logger = new Logger(PengpaiService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop'),
    Cookie:
      'acw_tc=76b20f4317025699174542619ecefb3cc82e1ab0f5e4b418dd0e62951e319b'
  }

  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  public async hot() {
    const response = await this.fetchService.get<OriginPengpaiHotRespones>(
      PENGPAI_API.HOT,
      { headers: this.headers }
    )

    const items = this.transformFields(response.data.data)

    return items
  }

  public async findByChannel(dto: PengpaiChannelDto) {
    const response = await this.fetchService.post<OriginPengpaiChannelResponse>(
      PENGPAI_API.CHANNEL,
      dto,
      { headers: this.headers }
    )

    const items = this.transformFields(response.data.data.list)
    const paginate = {
      totalPage: response.data.data.pageNum,
      totalSize: response.data.data.pageSize,
      hasNext: response.data.data.hasNext
    }

    const data = { items, paginate }

    return data
  }
  public async findByNode(dto: PengpaiNodeDto) {
    const response = await this.fetchService.post<OriginPengpaiNodeResponse>(
      PENGPAI_API.NODE,
      dto,
      { headers: this.headers }
    )

    const items = this.transformFields(response.data.data.list)
    const paginate = {
      totalPage: response.data.data.pageNum,
      totalSize: response.data.data.pageSize,
      hasNext: response.data.data.hasNext
    }

    const data = { items, paginate }

    return data
  }

  public transformFields(items: OriginPengpaiItem[]) {
    return items.map((item) => {
      return {
        ...item,
        title: item.name,
        thumbnailUrl: item.smallPic,
        publishedDate: item.pubTimeLong,
        stats: {
          hot: item.interactionNum
        }
        // node: {
        //   id: item.nodeInfo.nodeId,
        //   name: item.nodeInfo.name,
        //   caption: item.nodeInfo.desc,
        //   avatarUrl: item.nodeInfo.pic
        // }
      }
    })
  }
}
