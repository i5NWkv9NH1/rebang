import { Module } from '@nestjs/common'
import { TiebaService } from './tieba.service'
import { TiebaController } from './tieba.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TiebaEntity } from './tieba.entity'
import { TiebaTask } from './tieba.task'

@Module({
  imports: [TypeOrmModule.forFeature([TiebaEntity])],
  providers: [TiebaService, TiebaTask],
  exports: [TiebaService, TiebaTask],
  controllers: [TiebaController]
})
export class TiebaModule {}
