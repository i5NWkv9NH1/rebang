import { Module } from '@nestjs/common'
import { NeteaseNewsService } from './netease-news.service'
import { NeteaseNewsController } from './netease-news.controller'
import { NeteaseNewsTask } from './netease-news.task'

@Module({
  providers: [NeteaseNewsService, NeteaseNewsTask],
  exports: [NeteaseNewsService, NeteaseNewsTask],
  controllers: [NeteaseNewsController]
})
export class NeteaseNewsModule {}
