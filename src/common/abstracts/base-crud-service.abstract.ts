import { Logger, NotFoundException, BadRequestException } from '@nestjs/common'
import { AbstractBaseEntity } from '../entities/base.entity'
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder
} from 'typeorm'

export abstract class BaseCrudService<T extends AbstractBaseEntity> {
  protected readonly logger: Logger

  constructor(private readonly repository: Repository<T>) {}

  protected abstract createQueryBuilder(): SelectQueryBuilder<T>

  protected abstract applyFilter<F>(
    qb: SelectQueryBuilder<T>,
    filter: F
  ): void | Promise<void>

  protected abstract applyCustom(
    qb: SelectQueryBuilder<T>
  ): void | Promise<void>

  public async findAll({
    page = 1,
    itemsPerPage = 10,
    filter
  }: {
    page?: number
    itemsPerPage?: number
    filter?: any
  }) {
    const qb = this.createQueryBuilder()

    await this.applyFilter(qb, filter)
    await this.applyCustom(qb)

    const itemsLength = await qb.getCount()
    const pagesLength = Math.ceil(itemsLength / itemsPerPage)

    if (page === -1) {
      const items = await qb.getMany()
      return {
        items,
        meta: {
          page: -1,
          itemsPerPage: itemsLength,
          itemsLength,
          pagesLength: 1
        }
      }
    }

    const skip = itemsPerPage > 0 ? (page - 1) * itemsPerPage : 0
    const take = itemsPerPage > 0 ? itemsPerPage : itemsLength

    const items = await qb.skip(skip).take(take).getMany()
    return {
      items,
      meta: {
        page,
        itemsPerPage,
        itemsLength,
        pagesLength
      }
    }
  }

  protected abstract beforeCreate(
    dto: DeepPartial<T>,
    entity: T
  ): Promise<void> | void
  public async create(dto: DeepPartial<T>) {
    const entity = this.repository.create(dto)
    await this.beforeCreate(dto, entity)
    return await this.repository.save(entity)
  }

  protected abstract beforeUpdate<Dto>(
    entity: T,
    dto: Dto
  ): Promise<void> | void
  public async update<Dto = T>(id: string, dto: Dto) {
    const entity = await this.findOneByIdWithThrow(id)
    await this.beforeUpdate(entity, dto)
    Object.assign(entity, dto)
    return await this.repository.save(entity)
  }

  protected abstract beforeRemove(entity: T): Promise<void> | void
  public async remove(id: string) {
    return await this.repository.delete(id)
  }

  protected abstract beforeSoftRemove(entity: T): Promise<void> | void
  public async softRemove(id: string): Promise<T> {
    const entity = await this.findOneByIdWithThrow(id)
    await this.beforeSoftRemove(entity)
    return await this.repository.softRemove(entity)
  }

  protected abstract beforeRecover(entity: T): Promise<void> | void
  public async recover(id: string): Promise<T> {
    const entity = await this.findOneByIdWithThrow(id, { withDeleted: true })
    if (!entity.deletedAt) {
      throw new BadRequestException('Entity already recover')
    }
    await this.beforeSoftRemove(entity)
    return await this.repository.recover(entity)
  }

  //#region basic find methods
  async findOneByFields(
    fields: FindOptionsWhere<T>,
    options?: FindOneOptions<T>
  ) {
    return await this.repository.findOne({
      where: fields,
      ...options
    })
  }

  public async findOne(options: FindOneOptions<T>) {
    return await this.repository.findOne(options)
  }

  public async findOneWithThrow(options: FindOneOptions<T>) {
    const entity = await this.repository.findOne(options)
    if (!entity) {
      throw new BadRequestException(`Entity not found`)
    }
    return entity
  }

  public async findOneById(id: string, options?: FindOneOptions<T>) {
    return await this.repository.findOne({
      where: { id },
      ...options
    } as FindOneOptions)
  }

  public async findOneByIdWithThrow(id: string, options?: FindOneOptions<T>) {
    const entity = await this.findOneById(id, options)
    if (!entity) {
      throw new BadRequestException(`Entity not found`)
    }
    return entity
  }
  //#endregion
}
