import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Queue } from 'bullmq'
import { JobDefinitData } from 'src/@types'
import { PartConfig } from 'src/modules/bussiness/website/entities/part-config.entity'
import { WebsiteService } from 'src/modules/bussiness/website/services/website.service'

export abstract class JobDefineService
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    protected readonly queue: Queue<JobDefinitData>, // 注入队列
    protected readonly websiteService: WebsiteService,
    protected readonly websiteIdentifier: string // 网站标识
  ) {}

  async onModuleInit() {
    const website = await this.websiteService.findPartsWithConfig(
      this.websiteIdentifier
    )
    for await (const part of website.parts) {
      let config: PartConfig
      if (part.activedConfigId) {
        config = part.configs.find((_) => _.id === part.activedConfigId)
      } else {
        config = part.configs.find((_) => !!_.enabled)
      }
      await this.queue.upsertJobScheduler(
        config.jobName,
        { pattern: config.pattern, immediately: config.immediately },
        {
          data: {
            part,
            config
          }
        }
      )
    }
  }

  async onModuleDestroy() {
    this.queue.removeAllListeners()
    await this.queue.drain()
    await this.queue.close()
  }
}
