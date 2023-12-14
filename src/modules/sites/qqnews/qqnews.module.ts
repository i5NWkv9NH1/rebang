import { Module } from '@nestjs/common';
import { QqnewsController } from './qqnews.controller';
import { QqnewsService } from './qqnews.service';

@Module({
  controllers: [QqnewsController],
  providers: [QqnewsService]
})
export class QqnewsModule {}
