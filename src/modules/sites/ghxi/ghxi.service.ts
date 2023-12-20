import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { GHXI_API } from './ghxi.constant'

@Injectable()
export class GhxiService {
  private readonly logger = new Logger(GhxiService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('mobile')
  }

  constructor(private readonly fetchService: FetchService) {}

  public async latest() {
    const response = await this.fetchService.get<{
      data: {
        list: { time: string; title: string; url: string }[]
        count: number
      }
    }>(GHXI_API.LATEST, {
      headers: this.headers
    })
    const items = response.data.data.list.map((item) => {
      return {
        title: item.title,
        originUrl: item.url,
        publishedDate: item.time
      }
    })

    return items
  }
  async pc() {
    const response = await this.fetchService.get<{
      data: {
        list: { time: string; title: string; url: string }[]
        count: number
      }
    }>(GHXI_API.PC, {
      headers: this.headers
    })
    const items = response.data.data.list.map((item) => {
      return {
        title: item.title,
        originUrl: item.url,
        publishedDate: item.time
      }
    })

    return items
  }
  async android() {
    const response = await this.fetchService.get<{
      data: {
        list: { time: string; title: string; url: string }[]
        count: number
      }
    }>(GHXI_API.ANDROID, {
      headers: this.headers
    })
    const items = response.data.data.list.map((item) => {
      return {
        title: item.title,
        originUrl: item.url,
        publishedDate: item.time
      }
    })

    return items
  }
}
