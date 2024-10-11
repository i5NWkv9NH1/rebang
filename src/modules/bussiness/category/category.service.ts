import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { RecConfig } from './entities/rec-config.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  // 获取分类页面下所有部分
  async getCategoryParts(categoryId: string) {
    return this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['parts', 'parts.website']
    })
  }

  /**
   * 格式化分类数据，包含对应的部分和相关网站信息
   * @returns {Promise<Category[]>} 格式化后的分类数据
   */
  async findAllCategoryWithParts(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['parts', 'parts.website']
    })
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations: ['websites', 'websites.parts', 'parts']
    })
  }
}
