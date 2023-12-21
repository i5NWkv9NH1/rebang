import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { JobOptions } from 'agenda-nest/dist/interfaces'
import { JobStatus, Queue } from 'bull'
import { ServiceType } from './type'

export interface BaseSiteJobProperty {
  // service: ServiceType<any>
  name: string
  queue: Queue
}

export class BaseSiteJob {
  public logger: Logger
  public queue: Queue
  public readonly types = [
    'active',
    'completed',
    'delayed',
    'failed',
    'paused',
    'waiting'
  ] as JobStatus[]

  constructor(obj: BaseSiteJobProperty) {
    if (!obj) {
      throw new Error('Should be pass Queue and Service')
    }
    const { name, queue } = obj

    this.logger = new Logger(name)
    this.queue = queue

    this.logger.debug(`Queue：${this.queue.name} 初始化`)
  }

  async removeAll() {
    // await this.queue.empty()
    // const jobs = await this.queue.getJobs(this.types)
    // for await (const job of jobs) {
    //   const opt = job.opts
    //   if (opt.repeat.key) {
    //     await this.queue.removeRepeatableByKey(job.opts.repeat.key)
    //   } else {
    //     await job.remove()
    //   }
    // }
    await this.queue.removeJobs('*')
  }

  async findAll() {
    return await this.queue.getJobs(this.types)
  }

  async find(id: string) {
    return await this.queue.getJob(id)
  }

  async create(data: any, opts: JobOptions) {
    return await this.queue.add(data, opts)
  }
}
