import { Module } from '@nestjs/common'
import { TencentNewsModule } from './tencent-news/tencent-news.module'
import { WereadModule } from './weread/weread.module'

@Module({
  imports: [TencentNewsModule, WereadModule]
})
export class TencentModule {}
