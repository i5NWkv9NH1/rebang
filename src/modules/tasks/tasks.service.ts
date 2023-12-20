import { InjectQueue } from '@nestjs/bull'
import { HttpException, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { HttpStatusCode } from 'axios'
import { JobStatus, Queue } from 'bull'
import { delay } from 'src/helpers'

@Injectable()
export class TasksService {}
