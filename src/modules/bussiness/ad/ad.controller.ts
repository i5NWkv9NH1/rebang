import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common'
import { AdService } from './ad.service'
import { Ad } from './entities/ad.entity'

@Controller('ads')
export class AdController {
  constructor(private readonly adService: AdService) {}

  // 创建广告
  @Post()
  create(@Body() adData: Partial<Ad>): Promise<Ad> {
    return this.adService.createAd(adData)
  }

  // 获取所有广告
  @Get()
  findAll(): Promise<Ad[]> {
    return this.adService.findAllAds()
  }

  // 根据 ID 获取广告
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ad> {
    return this.adService.findAdById(id)
  }

  // 更新广告
  @Put(':id')
  update(@Param('id') id: string, @Body() adData: Partial<Ad>): Promise<Ad> {
    return this.adService.updateAd(id, adData)
  }

  // 删除广告
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.adService.deleteAd(id)
  }

  // 记录广告统计
  @Post(':id/stats')
  recordStat(
    @Param('id') id: string,
    @Body('action') action: 'view' | 'click'
  ): Promise<void> {
    return this.adService.recordAdStat(id, action)
  }

  // 获取广告统计
  @Get(':id/stats')
  getStats(@Param('id') id: string) {
    return this.adService.getAdStats(id)
  }
}
