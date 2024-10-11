/**
 * * description 爬虫逻辑，返回数据
 * TODO: 监测日志、进度
 */
import { Injectable, Logger } from '@nestjs/common'
import { FetchService } from 'src/shared/services/fetch.service'
import { ZhihuAPI } from './zhihu.constant'
import * as cheerio from 'cheerio'
import { Job } from 'bullmq'
import { JobDefinitData } from 'src/@types'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import { BaseScrapy } from 'src/common/abstracts/base-scrapy.service'

@Injectable()
export class ZhihuScrapy extends BaseScrapy {
  protected readonly logger = new Logger(ZhihuScrapy.name)

  constructor(http: FetchService) {
    super(http)
  }

  public async trend(job: Job<JobDefinitData>) {
    const response = await this.fetchData(job, ZhihuAPI.Trend)

    const $ = cheerio.load(response.data, { xmlMode: false })
    let items = []
    $('script').each((_, el) => {
      const id = $(el).attr('id')
      if (id === 'js-initialData') {
        job.updateProgress(50)
        const json = JSON.parse($(el).text())
        const parsedJSON = json['initialState']['topstory']['hotList']
        items = parsedJSON.map((item) => {
          return {
            id: uuid(),
            title: item.target.titleArea.text,
            subtitle: item.target.excerptArea.text,
            thumbnailUrl: this.picUrl(item.target.imageArea.url),
            originUrl: item.target.link.url,
            stats: {
              hot: this.convertSingleHeat(item.target.metricsArea.text),
              answer: item.feedSpecific.answerCount
            },
            time: dayjs().format('YYYY-MM-DD HH:mm:ss')
          }
        })
      }
    })

    return items
  }

  picUrl(picUrl: string) {
    return picUrl.replace(
      /\/\d+\/([a-zA-Z0-9-]+)(_(720w|qhd|b)\.[a-z]+)?(\?source=.*)?$/,
      '/$1'
    )
  }

  convertSingleHeat(heat: string) {
    // 使用正则表达式提取数字和单位，处理可能的空格
    const match = heat.match(/(\d*\.?\d+)\s?(万热度|万|百万)?/)

    if (!match) {
      return null
    }

    const number = parseFloat(match[1])
    const unit = match[2]

    // 根据单位进行转换
    if (unit === '百万') {
      return number * 1000000
    } else if (unit === '万' || unit === '万热度') {
      return number * 10000
    } else {
      return number
    }
  }
}
