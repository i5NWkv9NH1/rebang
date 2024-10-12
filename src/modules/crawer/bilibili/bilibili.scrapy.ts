import { Injectable, Logger } from '@nestjs/common'
import { Job } from 'bullmq'
import { JobDefinitData } from 'src/@types'
import { FetchService } from 'src/shared/services/fetch.service'
import { BilibiliApi } from './bilibili.constant'
import { v4 } from 'uuid'
import { formatCurrentDay } from 'src/utils/day.util'
import { BaseScrapy } from 'src/common/abstracts/base-scrapy-service.abstract'

@Injectable()
export class BilibiliScrapy extends BaseScrapy {
  protected readonly logger = new Logger(BilibiliScrapy.name)

  constructor(http: FetchService) {
    super(http)
  }

  //* 全站日榜
  async rank(job: Job<JobDefinitData>) {
    const response = await this.fetchData(job, BilibiliApi.Rank)
    return this.transformItems(response.data.data.list)
  }
  //* 每周必看
  async week(job: Job<JobDefinitData>) {
    const response = await this.fetchData(job, BilibiliApi.Week)
    return response.data.data.list.map((item) => {
      return {
        id: v4(),
        subtitle: item.rcmd_reason,
        title: item.title,
        thumbnailUrl: item.cover,
        originUrl: `https://bilibili.com/video/${item.bvid}`,
        time: formatCurrentDay(),
        extra: {
          tag: item.right_desc_1
        },
        stats: {
          heat: this.extractNumberAndConvert(item.right_desc_2),
          view: this.extractNumberAndConvert(item.right_desc_2)
        }
      }
    })
  }
  //* 综合热门
  async hot(job: Job<JobDefinitData>) {
    const response = await this.fetchData(job, BilibiliApi.Hot)
    return this.transformItems(response.data.data)
  }
  //* 入站必刷
  async rec(job: Job<JobDefinitData>) {
    const response = await this.fetchData(job, BilibiliApi.Rec)

    return response.data.data.card.map((item) => {
      return {
        id: v4(),
        time: formatCurrentDay(),
        title: item.title,
        subtitle: item.achievement,
        thumbnailUrl: item.cover,
        originUrl: `https://bilibili.com/video/${item.bvid}`,
        extra: {
          author: {
            name: item.right_desc_1
          }
        },
        stats: {
          heat: this.extractNumberAndConvert(item.right_desc_2),
          view: this.extractNumberAndConvert(item.right_desc_2)
        }
      }
    })
  }
  //* 热搜
  async search(job: Job<JobDefinitData>) {
    const response = await this.fetchData(job, BilibiliApi.Search)

    return response.data.data.trending.list.map((item) => {
      return {
        id: v4(),
        title: item.show_name,
        subtitle: item.keyword,
        originUrl: `https://search.bilibili.com/all?keyword=${encodeURIComponent(item.keyword)}`,
        stats: {
          heat: item.heat_score
        }
      }
    })
  }
  //* 会员购
  async shop(job: Job<JobDefinitData>) {
    const response = await this.fetchData(job, BilibiliApi.Shop)
    return response.data.data.vo.days[0].presaleItems.map((item) => {
      return {
        id: v4(),
        title: item.name,
        thumbnailUrl: item.img,
        originUrl: `https://mall.bilibili.com/detail.html?itemsId=${item.itemsId}`,
        stats: {
          heat: item.like,
          like: item.like
        },
        extra: {
          price: item.price
        }
      }
    })
  }

  public transformItems(items: any[]) {
    return items.map((item) => {
      let author: any = {}
      if (item.author) {
        author.id = item.author.mid
        author.name = item.author.name
        author.avatarUrl = item.author.face
        author.url = `https://space.bilibili.com/${item.author.mid}`
      } else {
        author.id = item.owner.mid
        author.name = item.owner.name
        author.avatarUrl = item.owner.face
        author.url = `https://space.bilibili.com/${item.owner.mid}`
      }
      return {
        // id: item.aid,
        id: v4(),
        title: item.title,
        subtitle: item.desc || item.hot_desc,
        originUrl: 'https://bilibili.com/video/' + item.bvid,
        thumbnailUrl: item.pic || item.thumbnail,
        time: formatCurrentDay(),
        extra: {
          publishedDate: item.pubdate || item.ctime,
          caption: item.desc || item.hot_desc,
          tag: item.tname,
          duration: item.duration,
          author
        },
        stats: {
          ...item.stat,
          heat: item.stat.view
        }
      }
    })
  }

  extractNumberAndConvert(str: string): number {
    // 使用正则表达式提取数字和单位
    const regex = /-?\d+(\.\d+)?(?=\s*万|亿)/ // 匹配数字，并查找后续的单位
    const match = str.match(regex)

    if (match) {
      const numberStr = match[0] // 提取到的数字部分
      const number = parseFloat(numberStr) // 转换为浮点数

      // 检查单位并计算完整数字
      let fullNumber
      if (str.includes('万')) {
        fullNumber = number * 10000 // 将数字乘以10000
      } else if (str.includes('亿')) {
        fullNumber = number * 100000000 // 如果单位是亿，则乘以100000000
      } else {
        fullNumber = number // 如果没有单位，保持原数字
      }

      return fullNumber
    }
    return 0
  }
}
