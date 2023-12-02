import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { TOUTIAO_API } from './toutiao.constant'
import { FetchService } from 'src/shared/fetch.service'
import {
  OriginToutiaoHotResponse,
  OriginToutiaoItem,
  ToutiaoItem
} from './toutiao.type'

@Injectable()
export class ToutiaoService {
  private readonly logger = new Logger(ToutiaoService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(private readonly fetchService: FetchService) {}

  public async hot(pageSize: number = 50) {
    // const url = `https://i-lq.snssdk.com/api/feed/hotboard_online/v1/`
    // const url = `https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc&_signature=_02B4Z6wo00901K4GSOgAAIDAd0X-V23-tBiuIkxAAE7hvBn4bCXyuX5Ke-yAkoA6FgpYmaV2ASCJYSXCTrP2Vq4qxe6oYVX3XtSjG6mqKdQrnFl0w0hhtJ0JSR-ZBaElW8V7cdn50RRCiXtq7b`
    const url = TOUTIAO_API.HOT

    const response = await this.fetchService.get<OriginToutiaoHotResponse>(
      url,
      { headers: this.headers }
    )
    const items: ToutiaoItem[] = response.data.data.map(
      (item: OriginToutiaoItem) => {
        const id = item.ClusterId
        const title = item.Title
        const originUrl = `${new URL(item.Url).host}${
          new URL(item.Url).pathname
        }`
        const thumbnailUrl = item.Image.url
        const metrics = [item.LabelDesc, item.Label].filter((item) => item)
        const stats = {
          hot: item.HotValue
        }
        const icon = item.Label
        const caption = item.LabelDesc
        return {
          id,
          title,
          originUrl,
          thumbnailUrl,
          metrics,
          icon,
          caption,
          stats
        }
      }
    )

    return items
  }
}
