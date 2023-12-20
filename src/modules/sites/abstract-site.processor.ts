import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { JobOptions } from 'agenda-nest/dist/interfaces'
import { JobStatus, Queue } from 'bull'
import { ServiceType } from 'src/shared/type'

export class AbstractSiteProcessor {
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

  constructor({ service, queue }: { service: ServiceType<any>; queue: Queue }) {
    this.logger = new Logger(service.name)
    this.queue = queue
  }

  async removeAll() {
    const jobs = await this.queue.getJobs(this.types)
    for await (const job of jobs) {
      await job.remove()
    }
    return jobs
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
