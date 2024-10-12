import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm'
import { Anc } from './entities/anc.entity'
import { BaseCrudService } from 'src/common/abstracts/base-crud-service.abstract'

@Injectable()
export class AncService extends BaseCrudService<Anc> {
  constructor(
    @InjectRepository(Anc)
    private ancRepository: Repository<Anc>
  ) {
    super(ancRepository)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Anc> {
    return this.ancRepository.createQueryBuilder('anc')
  }
  protected applyFilter<F>(
    qb: SelectQueryBuilder<Anc>,
    filter: F
  ): void | Promise<void> {}
  protected applyCustom(qb: SelectQueryBuilder<Anc>): void | Promise<void> {}
  protected beforeCreate(
    dto: DeepPartial<Anc>,
    entity: Anc
  ): Promise<void> | void {}
  protected beforeUpdate<Dto>(entity: Anc, dto: Dto): Promise<void> | void {}
  protected beforeRemove(entity: Anc): Promise<void> | void {}
  protected beforeSoftRemove(entity: Anc): Promise<void> | void {}
  protected beforeRecover(entity: Anc): Promise<void> | void {}
}
