import { Module } from '@nestjs/common'
import { AdService } from './ad.service'
import { AdController } from './ad.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ad } from './entities/ad.entity'
import { AdStat } from './entities/ad-stat.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Ad, AdStat])],
  providers: [AdService],
  exports: [AdService]
})
export class AdModule {}
