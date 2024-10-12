import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm'
import { Category } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { BaseCrudService } from 'src/common/abstracts/base-crud-service.abstract'

@Injectable()
export class CategoryService extends BaseCrudService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {
    super(categoryRepository)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Category> {
    return this.categoryRepository.createQueryBuilder('category')
  }
  protected applyFilter<F>(
    qb: SelectQueryBuilder<Category>,
    filter: F
  ): void | Promise<void> {}
  protected applyCustom(
    qb: SelectQueryBuilder<Category>
  ): void | Promise<void> {}
  protected beforeCreate(
    dto: DeepPartial<Category>,
    entity: Category
  ): Promise<void> | void {}
  protected beforeUpdate<Dto>(
    entity: Category,
    dto: Dto
  ): Promise<void> | void {}
  protected beforeRemove(entity: Category): Promise<void> | void {}
  protected beforeSoftRemove(entity: Category): Promise<void> | void {}
  protected beforeRecover(entity: Category): Promise<void> | void {}
}
