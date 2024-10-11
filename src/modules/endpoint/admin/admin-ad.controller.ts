import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common'
import { AdService } from 'src/modules/bussiness/ad/ad.service'
import { Ad } from 'src/modules/bussiness/ad/entities/ad.entity'

@Controller({ path: 'ads', version: '1' })
export class AdminAdController {
  constructor(private readonly adService: AdService) {}

  @Post()
  create(@Body() adData: Partial<Ad>): Promise<Ad> {
    return this.adService.createAd(adData)
  }

  @Get()
  findAll(): Promise<Ad[]> {
    return this.adService.findAllAds()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ad> {
    return this.adService.findAdById(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() adData: Partial<Ad>): Promise<Ad> {
    return this.adService.updateAd(id, adData)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.adService.deleteAd(id)
  }

  @Post(':id/stats')
  recordStat(
    @Param('id') id: string,
    @Body('action') action: 'view' | 'click'
  ): Promise<void> {
    return this.adService.recordAdStat(id, action)
  }

  @Get(':id/stats')
  getStats(@Param('id') id: string) {
    return this.adService.getAdStats(id)
  }
}
