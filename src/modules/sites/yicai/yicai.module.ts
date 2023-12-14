import { Module } from '@nestjs/common';
import { YicaiService } from './yicai.service';
import { YicaiController } from './yicai.controller';

@Module({
  providers: [YicaiService],
  controllers: [YicaiController]
})
export class YicaiModule {}
