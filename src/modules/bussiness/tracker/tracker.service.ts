import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm'
import { CreateTrackerDto } from './dto/create-tracker.dto'
import { UpdateTrackerDto } from './dto/update-tracker.dto'
import { Tracker } from './entities/tracker.entity' // 假设您有一个 Tracker 实体
import { BaseCrudService } from 'src/common/abstracts/base-crud-service.abstract'

@Injectable()
export class TrackerService extends BaseCrudService<Tracker> {
  constructor(
    @InjectRepository(Tracker)
    private readonly trackerRepository: Repository<Tracker>
  ) {
    super(trackerRepository)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Tracker> {
    return this.trackerRepository.createQueryBuilder('tracker')
  }
  protected applyFilter<F>(
    qb: SelectQueryBuilder<Tracker>,
    filter: F
  ): void | Promise<void> {}
  protected applyCustom(
    qb: SelectQueryBuilder<Tracker>
  ): void | Promise<void> {}
  protected beforeCreate(
    dto: DeepPartial<Tracker>,
    entity: Tracker
  ): Promise<void> | void {}
  protected beforeUpdate<Dto>(
    entity: Tracker,
    dto: Dto
  ): Promise<void> | void {}
  protected beforeRemove(entity: Tracker): Promise<void> | void {}
  protected beforeSoftRemove(entity: Tracker): Promise<void> | void {}
  protected beforeRecover(entity: Tracker): Promise<void> | void {}
}
