import { Module } from '@nestjs/common'
import { PengpaiController } from './pengpai.controller'
import { PengpaiService } from './pengpai.service'
import { PengpaiTask } from './pengpai.task'

@Module({
  controllers: [PengpaiController],
  providers: [PengpaiService, PengpaiTask],
  exports: [PengpaiService, PengpaiTask]
})
export class PengpaiModule {}
