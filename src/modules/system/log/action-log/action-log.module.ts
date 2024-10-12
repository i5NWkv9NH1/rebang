import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActionLog } from './entities/action-log.entity'
import { ActionLogService } from './services/action-log.service'

@Module({
  imports: [TypeOrmModule.forFeature([ActionLog])],
  providers: [ActionLogService],
  exports: [ActionLogService]
})
export class ActionLogModule {}
