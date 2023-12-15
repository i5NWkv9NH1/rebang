import { Module } from '@nestjs/common'
import { PearvideoService } from './pearvideo.service'
import { PearvideoController } from './pearvideo.controller'
import { PearvideoTask } from './pearvideo.task'

@Module({
  controllers: [PearvideoController],
  providers: [PearvideoService, PearvideoTask],
  exports: [PearvideoService, PearvideoTask]
})
export class PearvideoModule {}
