import { Module } from '@nestjs/common'
import { ToutiaoService } from './toutiao.service'
import { ToutiaoController } from './toutiao.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ToutiaoEntity } from './toutiao.entity'
import { ToutiaoTask } from './toutiao.task'

@Module({
  // imports: [TypeOrmModule.forFeature([ToutiaoEntity])],
  providers: [ToutiaoService, ToutiaoTask],
  exports: [ToutiaoService, ToutiaoTask],
  controllers: [ToutiaoController]
})
export class ToutiaoModule {}
