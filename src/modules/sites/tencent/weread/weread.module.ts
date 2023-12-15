import { Module } from '@nestjs/common'
import { WereadService } from './weread.service'
import { WereadController } from './weread.controller'
import { WereadTask } from './weread.task'

@Module({
  providers: [WereadService, WereadTask],
  exports: [WereadService, WereadTask],
  controllers: [WereadController]
})
export class WereadModule {}
