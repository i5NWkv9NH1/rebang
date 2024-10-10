import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { WebsiteService } from '../website/website.service'
import { PartService } from '../website/services/part.service'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
    // private readonly websiteService: WebsiteService,
    // private readonly partService: PartService
  ) {}

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
