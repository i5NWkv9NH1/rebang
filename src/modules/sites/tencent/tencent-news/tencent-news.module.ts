import { Module } from '@nestjs/common';
import { TencentNewsController } from './tencent-news.controller';
import { TencentNewsService } from './tencent-news.service';

@Module({
  controllers: [TencentNewsController],
  providers: [TencentNewsService]
})
export class TencentNewsModule {}
