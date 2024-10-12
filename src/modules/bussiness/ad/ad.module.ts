import { Module } from '@nestjs/common'
import { AdService } from './services/ad.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ad } from './entities/ad.entity'
import { AdStat } from './entities/ad-stat.entity'
import { AdStatService } from './services/ad-stat.service'

@Module({
  imports: [TypeOrmModule.forFeature([Ad, AdStat])],
  providers: [AdService, AdStatService],
  exports: [AdService, AdStatService]
})
export class AdModule {}
