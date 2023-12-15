import { Module } from '@nestjs/common'
import { ShadiaonewsController } from './shadiaonews.controller'
import { ShadiaonewsService } from './shadiaonews.service'
import { ShadiaoNewsTask } from './shadiaonews.task'

@Module({
  controllers: [ShadiaonewsController],
  providers: [ShadiaonewsService, ShadiaoNewsTask],
  exports: [ShadiaonewsService, ShadiaoNewsTask]
})
export class ShadiaonewsModule {}
