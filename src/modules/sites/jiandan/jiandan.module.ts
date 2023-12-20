import { Module } from '@nestjs/common'
import { JiandanService } from './jiandan.service'
import { JiandanController } from './jiandan.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JiandanEntity } from './jiandan.entity'
import { JiandanTask } from './jiandan.task'

@Module({
  // imports: [TypeOrmModule.forFeature([JiandanEntity])],
  providers: [JiandanService, JiandanTask],
  exports: [JiandanService, JiandanTask],
  controllers: [JiandanController]
})
export class JiandanModule {}
