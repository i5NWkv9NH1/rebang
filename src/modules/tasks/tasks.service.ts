import { InjectQueue } from '@nestjs/bull'
import { HttpException, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { HttpStatusCode } from 'axios'
import { Queue } from 'bull'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  // constructor(private readonly schedulerRegistry: SchedulerRegistry) {}
  constructor(
    @InjectQueue('_36k')
    private readonly _36kQueue: Queue,
    @InjectQueue('_360')
    private readonly _360Queue: Queue
  ) {}

  public async findAllTask() {
    return await this._36kQueue.getJobs([
      'active',
      'completed',
      'delayed',
      'failed',
      'paused',
      'waiting'
    ])
    // let tasks: any[] = []
    // const jobs = this.schedulerRegistry.getCronJobs()
    // jobs.forEach((job, key, map) => {
    //   const item = {
    //     lastDate: job.lastDate(),
    //     lastExcute: job.lastExecution,
    //     cronTime: job.context.cronTime.toString()
    //   }
    //   tasks.push(item)
    // })
    // return tasks
  }

  public startByTaskName(name: string) {
    // const task = this.schedulerRegistry.getCronJob(name)
    // if (!task) {
    //   throw new HttpException(`Task ${name} not Found`, HttpStatusCode.NotFound)
    // }
    // task.stop()
    // return { status: 'ok' }
  }
  public stopByTaskName(name: string) {
    // const task = this.schedulerRegistry.getCronJob(name)
    // if (!task) {
    //   throw new HttpException(`Task ${name} not Found`, HttpStatusCode.NotFound)
    // }
    // task.start()
    // return { status: 'ok' }
  }
  public setTaskTimeByName() {}

  public async findTaskByName(id: string) {
    // return await this._36kQueue.getJobs(['active', 'completed', 'delayed', 'failed', 'paused', 'waiting'])
    return await this._36kQueue.getJob(id)
    // return this.schedulerRegistry.getCronJob(name)
  }
}
