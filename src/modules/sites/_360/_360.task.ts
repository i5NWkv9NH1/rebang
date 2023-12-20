import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { AbstractSiteProcessor } from '../abstract-site.processor'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

@Injectable()
export class _360Task
  extends AbstractSiteProcessor
  implements OnModuleInit, OnModuleDestroy
{
  private readonly tasks: []

  constructor(
    @InjectQueue('_360')
    queue: Queue
  ) {
    super({ service: _360Task, queue })
  }

  async onModuleInit() {}

  async onModuleDestroy() {}
}
