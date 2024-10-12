import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm'
import { Ad } from '../entities/ad.entity'
import { BaseCrudService } from 'src/common/abstracts/base-crud-service.abstract'

@Injectable()
export class AdService extends BaseCrudService<Ad> {
  constructor(
    @InjectRepository(Ad)
    private adRepository: Repository<Ad>
  ) {
    super(adRepository)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Ad> {
    return this.adRepository.createQueryBuilder('ad')
  }
  protected applyFilter<F>(
    qb: SelectQueryBuilder<Ad>,
    filter: F
  ): void | Promise<void> {}
  protected applyCustom(qb: SelectQueryBuilder<Ad>): void | Promise<void> {}

  protected beforeCreate(
    dto: DeepPartial<Ad>,
    entity: Ad
  ): Promise<void> | void {}
  protected beforeUpdate<Dto>(entity: Ad, dto: Dto): Promise<void> | void {}
  protected beforeRemove(entity: Ad): Promise<void> | void {}
  protected beforeSoftRemove(entity: Ad): Promise<void> | void {}
  protected beforeRecover(entity: Ad): Promise<void> | void {}
}
