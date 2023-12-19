import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { SitesModule } from '../sites/sites.module'
import { ScheduleModule } from '@nestjs/schedule'
import { BullModule } from '@nestjs/bull'

@Module({
  providers: [TasksService],
  exports: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
