import { Module } from '@nestjs/common'
import { HistoryService } from './history.service'
import { HistoryController } from './history.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HistoryEntity } from './history.entity'
import { HistoryTask } from './history.task'

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
  providers: [HistoryService, HistoryTask],
  exports: [HistoryService, HistoryTask],
  controllers: [HistoryController]
})
export class HistoryModule {}
