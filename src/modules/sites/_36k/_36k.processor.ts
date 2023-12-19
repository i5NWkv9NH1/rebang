import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job, Queue } from 'bull'

@Processor('_36k')
export class _36kProcessor {
  private readonly logger = new Logger(_36kProcessor.name)

  constructor(
    @InjectQueue('_36k')
    private readonly queue: Queue
  ) {}

  @Process()
  handleUnNameTask(job: Job) {
    this.logger.debug(`Handle un name job`)
  }

  @Process('transcode')
  handleTranscode(job: Job) {
    this.logger.debug(`Handle job :: ${job.name}`)
    this.logger.debug(this.queue.name)
  }
}
