import { Module } from '@nestjs/common'
import { AdService } from './ad.service'
import { AdController } from './ad.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ad } from './entities/ad.entity'
import { AdStat } from './entities/ad-stat.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Ad, AdStat])],
  controllers: [AdController],
  providers: [AdService]
})
export class AdModule {}
