import { InjectQueue } from '@nestjs/bull'
import { HttpException, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { HttpStatusCode } from 'axios'
import { JobStatus, Queue } from 'bull'
import { delay } from 'src/helpers'

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name)
  private readonly types = [
    'active',
    'completed',
    'delayed',
    'failed',
    'paused',
    'waiting'
  ] as JobStatus[]
  private selectedQueue: Queue

  // constructor(private readonly schedulerRegistry: SchedulerRegistry) {}
  constructor(
    @InjectQueue('_36k')
    private readonly queue_36k: Queue,
    @InjectQueue('_360')
    private readonly queue_360: Queue
  ) {}

  async onModuleInit() {}
  async findAllTask() {

  }

  async findAllBySite(site: string) {
    const name = `queue_${site}` as 'queue_36k' | 'queue_360'
    this.selectedQueue = this[name]
    return this.selectedQueue.getJobs(this.types)
  }
}
