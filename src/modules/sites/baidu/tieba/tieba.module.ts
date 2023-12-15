import { Module } from '@nestjs/common'
import { TiebaService } from './tieba.service'
import { TiebaController } from './tieba.controller'
import { TiebaTask } from './tieba.task'

@Module({
  imports: [],
  providers: [TiebaService, TiebaTask],
  exports: [TiebaService, TiebaTask],
  controllers: [TiebaController]
})
export class TiebaModule {}
