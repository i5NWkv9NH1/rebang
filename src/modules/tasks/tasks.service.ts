import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name)

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  onModuleInit() {
    this.findAllTask()
  }

  public findAllTask() {
    const jobs = this.schedulerRegistry.getCronJobs()
    jobs.forEach((value, key, map) => {
      this.logger.log(`job: ${key} -> next: ${value.cronTime}`)
    })
  }
}
