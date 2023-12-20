import { Injectable, OnModuleInit } from '@nestjs/common'
import { _36KService } from './_36k.service'
import { Cron, CronExpression } from '@nestjs/schedule'
import { _36K_CRON } from './_36k.constant'
import { TasksService } from 'src/modules/tasks/tasks.service'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@Injectable()
export class _36KTask {}
