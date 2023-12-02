import { Module } from '@nestjs/common'
import { JuejinController } from './juejin.controller'
import { JuejinService } from './juejin.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JuejinEntity } from './juejin.entity'
import { JuejinTask } from './juejin.task'

@Module({
  imports: [TypeOrmModule.forFeature([JuejinEntity])],
  providers: [JuejinService, JuejinTask],
  exports: [JuejinService, JuejinTask],
  controllers: [JuejinController]
})
export class JuejinModule {}
