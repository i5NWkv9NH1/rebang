import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm'
import { BaseCrudService } from 'src/common/abstracts/base-crud-service.abstract'
import { AdStat } from '../entities/ad-stat.entity'

@Injectable()
export class AdStatService extends BaseCrudService<AdStat> {
  constructor(
    @InjectRepository(AdStat)
    private adStatRepository: Repository<AdStat>
  ) {
    super(adStatRepository)
  }

  protected createQueryBuilder(): SelectQueryBuilder<AdStat> {
    return this.adStatRepository.createQueryBuilder('ad-stat')
  }
  protected applyFilter<F>(
    qb: SelectQueryBuilder<AdStat>,
    filter: F
  ): void | Promise<void> {}
  protected applyCustom(qb: SelectQueryBuilder<AdStat>): void | Promise<void> {}

  protected beforeCreate(
    dto: DeepPartial<AdStat>,
    entity: AdStat
  ): Promise<void> | void {}
  protected beforeUpdate<Dto>(entity: AdStat, dto: Dto): Promise<void> | void {}
  protected beforeRemove(entity: AdStat): Promise<void> | void {}
  protected beforeSoftRemove(entity: AdStat): Promise<void> | void {}
  protected beforeRecover(entity: AdStat): Promise<void> | void {}
}
