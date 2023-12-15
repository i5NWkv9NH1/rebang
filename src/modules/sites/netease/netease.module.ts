import { Module } from '@nestjs/common'

import { NeteaseNewsModule } from './netease-news/netease-news.module'

@Module({
  imports: [NeteaseNewsModule]
})
export class NeteaseModule {}
