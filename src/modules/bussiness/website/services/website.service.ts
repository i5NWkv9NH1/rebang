import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brackets, DeepPartial, Repository, SelectQueryBuilder } from 'typeorm'
import { Website } from '../entities/website.entity'
import { BaseCrudService } from 'src/common/abstracts/base-crud-service.abstract'

@Injectable()
export class WebsiteService extends BaseCrudService<Website> {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>
  ) {
    super(websiteRepository)
  }

  async findPartsWithConfig(websiteName: string) {
    const parts = await this.websiteRepository
      .createQueryBuilder('website')
      .innerJoinAndSelect('website.parts', 'part')
      .innerJoinAndSelect('part.configs', 'config')
      .where('website.name = :name', { name: websiteName })
      .getOne()

    return parts
  }

  protected createQueryBuilder(): SelectQueryBuilder<Website> {
    return this.websiteRepository.createQueryBuilder('website')
  }
  protected applyFilter<F>(
    qb: SelectQueryBuilder<Website>,
    filter: F
  ): void | Promise<void> {}
  protected applyCustom(
    qb: SelectQueryBuilder<Website>
  ): void | Promise<void> {}
  protected beforeCreate(
    dto: DeepPartial<Website>,
    entity: Website
  ): Promise<void> | void {}
  protected beforeUpdate<Dto>(
    entity: Website,
    dto: Dto
  ): Promise<void> | void {}
  protected beforeRemove(entity: Website): Promise<void> | void {}
  protected beforeSoftRemove(entity: Website): Promise<void> | void {}
  protected beforeRecover(entity: Website): Promise<void> | void {}
}
