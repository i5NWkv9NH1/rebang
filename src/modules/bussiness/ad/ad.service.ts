import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdStat } from './entities/ad-stat.entity'
import { Ad } from './entities/ad.entity'

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(Ad)
    private adRepository: Repository<Ad>,
    @InjectRepository(AdStat)
    private adStatRepository: Repository<AdStat>
  ) {}

  // 创建广告
  async createAd(adData: Partial<Ad>): Promise<Ad> {
    const ad = this.adRepository.create(adData)
    return this.adRepository.save(ad)
  }

  // 获取所有广告
  async findAllAds(): Promise<Ad[]> {
    return this.adRepository.find()
  }

  // 根据 ID 获取广告
  async findAdById(id: string): Promise<Ad> {
    return this.adRepository.findOneBy({ id })
  }

  // 更新广告
  async updateAd(id: string, adData: Partial<Ad>): Promise<Ad> {
    await this.adRepository.update(id, adData)
    return this.findAdById(id)
  }

  // 删除广告
  async deleteAd(id: string): Promise<void> {
    await this.adRepository.delete(id)
  }

  // 记录广告统计
  async recordAdStat(adId: string, action: 'view' | 'click'): Promise<void> {
    let stat = await this.adStatRepository.findOne({
      where: { ad: { id: adId } }
    })

    if (!stat) {
      stat = this.adStatRepository.create({
        ad: { id: adId },
        views: 0,
        clicks: 0
      })
    }

    if (action === 'view') {
      stat.views += 1
    } else if (action === 'click') {
      stat.clicks += 1
    }

    await this.adStatRepository.save(stat)
  }

  // 获取广告统计
  async getAdStats(adId: string): Promise<AdStat> {
    return this.adStatRepository.findOne({ where: { ad: { id: adId } } })
  }
}
