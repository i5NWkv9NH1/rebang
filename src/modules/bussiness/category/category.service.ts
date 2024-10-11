import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { RecConfig } from './entities/rec-config.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(RecConfig)
    private readonly recConfigRepository: Repository<RecConfig>
    // private readonly websiteService: WebsiteService,
    // private readonly partService: PartService
  ) {}

  // 获取分类页面下所有部分
  async getCategoryParts(categoryId: string) {
    return this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['parts', 'parts.website']
    })
  }

  // 获取首页分类配置
  async getRecConfig(categoryId: string) {
    return this.recConfigRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category', 'part', 'part.website']
    })
  }

  /**
   * 格式化分类数据，包含对应的部分和相关网站信息
   * @returns {Promise<Category[]>} 格式化后的分类数据
   */
  async findAllCategoryWithParts(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      // relations: ['parts', 'websites']
      relations: ['parts', 'parts.website']
    })

    // return categories.map((category) => ({
    //   ...category,
    //   parts: category.parts.map((part) => ({
    //     name: part.name,
    //     website: category.websites.find(
    //       (website) => website.id === part.website.id
    //     )
    //   }))
    // }))
    return categories
  }

  async findAll() {
    return await this.categoryRepository.find()
  }
}
