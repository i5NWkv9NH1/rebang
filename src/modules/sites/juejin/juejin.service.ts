import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { JUEJIN_API } from './juejin.constant'
import {
  JuejinItem,
  OriginJuejinItem,
  OriginJuejinResponse
} from './juejin.type'

@Injectable()
export class JuejinService {
  private readonly logger = new Logger(JuejinService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(private readonly fetchService: FetchService) {}

  //#region 综合
  public async mix() {
    const url = JUEJIN_API.MIX
    const response = await this.fetchService.get<OriginJuejinResponse>(url, {
      headers: this.headers
    })

    const items = this.transformFields(response.data.data)
    return items
  }
  //#endregion

  //#region 后端
  public async be() {
    const url = JUEJIN_API.BE
    const response = await this.fetchService.get<OriginJuejinResponse>(url, {
      headers: this.headers
    })

    const items = this.transformFields(response.data.data)
    return items
  }
  //#endregion

  //#region 前端
  public async fe() {
    const url = JUEJIN_API.FE
    const response = await this.fetchService.get<OriginJuejinResponse>(url, {
      headers: this.headers
    })

    const items = this.transformFields(response.data.data)
    return items
  }
  //#endregion

  //#region 安卓
  public async android() {
    const url = JUEJIN_API.FE
    const response = await this.fetchService.get<OriginJuejinResponse>(url, {
      headers: this.headers
    })

    const items = this.transformFields(response.data.data)
    return items
  }
  //#endregion

  //#region iOS
  public async iOS() {
    const url = JUEJIN_API.IOS
    const response = await this.fetchService.get<OriginJuejinResponse>(url, {
      headers: this.headers
    })

    const items = this.transformFields(response.data.data)
    return items
  }
  //#endregion

  //#region 人工智能
  public async ai() {
    const url = JUEJIN_API.AI
    const response = await this.fetchService.get<OriginJuejinResponse>(url, {
      headers: this.headers
    })

    const items = this.transformFields(response.data.data)
    return items
  }
  //#endregion

  //#region 开发工具
  public async develop() {
    const url = JUEJIN_API.DEVELOP
    const response = await this.fetchService.get<OriginJuejinResponse>(url, {
      headers: this.headers
    })

    const items = this.transformFields(response.data.data)
    return items
  }
  //#endregion

  //#region 代码人生
  public async code() {
    const url = JUEJIN_API.CODE
    const response = await this.fetchService.get<OriginJuejinResponse>(url, {
      headers: this.headers
    })

    const items = this.transformFields(response.data.data)
    return items
  }
  //#endregion

  //#region 阅读
  public async read() {
    const url = JUEJIN_API.CODE
    const response = await this.fetchService.get<OriginJuejinResponse>(url, {
      headers: this.headers
    })

    const items = this.transformFields(response.data.data)
    return items
  }
  //#endregion

  //* data is response.body
  //* it include data content
  public transformFields(items: OriginJuejinItem[]): JuejinItem[] {
    return items.map((item) => {
      return {
        id: item.content.content_id,
        title: item.content.title,
        caption: item.content.brief,
        originUrl: 'https://juejin.cn/post/' + item.content.content_id,
        publishedDate: '',
        thumbnailUrl: '',
        stats: {
          collect: item.content_counter.collect,
          hot: item.content_counter.hot_rank,
          like: item.content_counter.like,
          view: item.content_counter.view,
          comment: item.content_counter.comment_count,
          interact: item.content_counter.interact_count
        },
        author: {
          id: item.author.user_id,
          name: item.author.name,
          avatarUrl: item.author.avatar
        }
      }
    })
  }
}
