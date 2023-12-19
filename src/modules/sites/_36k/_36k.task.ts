import { Injectable, OnModuleInit } from '@nestjs/common'
import { _36KService } from './_36k.service'
import { Cron, CronExpression } from '@nestjs/schedule'
import { _36K_CRON } from './_36k.constant'
import { TasksService } from 'src/modules/tasks/tasks.service'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@Injectable()
export class _36KTask implements OnModuleInit {
  constructor(
    @InjectQueue('_36k')
    private readonly _36kQueue: Queue
  ) {}

  async onModuleInit() {
    this._36kQueue.add('')

    this._36kQueue.add(
      'transcode',
      { value: 1 },
      { repeat: { cron: CronExpression.EVERY_5_SECONDS } }
    )
  }
}
