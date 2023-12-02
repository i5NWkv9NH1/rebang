import { Module } from '@nestjs/common'
import { ITHomeService } from './ithome.service'
import { ITHomeController } from './ithome.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ITHomeEntity } from './ithome.entity'
import { ITHomeTask } from './ithome.task'

@Module({
  imports: [TypeOrmModule.forFeature([ITHomeEntity])],
  providers: [ITHomeService, ITHomeTask],
  exports: [ITHomeService, ITHomeTask],
  controllers: [ITHomeController]
})
export class ITHomeModule {}
