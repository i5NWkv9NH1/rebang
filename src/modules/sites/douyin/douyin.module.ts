import { Module } from '@nestjs/common'
import { DouyinService } from './douyin.service'
import { DouyinController } from './douyin.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DouyinTask } from './douyin.task'
import { DouyinEntity } from './douyin.entity'

@Module({
  // imports: [TypeOrmModule.forFeature([DouyinEntity])],
  providers: [DouyinService, DouyinTask],
  exports: [DouyinService, DouyinTask],
  controllers: [DouyinController]
})
export class DouyinModule {}
