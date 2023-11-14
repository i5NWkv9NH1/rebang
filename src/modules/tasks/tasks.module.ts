import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { SitesModule } from '../sites/sites.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [ScheduleModule.forRoot(), SitesModule],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
