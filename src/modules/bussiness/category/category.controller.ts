import { Controller, Get, Param } from '@nestjs/common'
import { CategoryService } from './category.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Repository } from 'typeorm'

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  @Get()
  async findAll() {
    return await this.categoryService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['websites', 'parts']
    })
  }

  @Get('rec/home')
  async findHome() {
    return await this.categoryService.findAllCategoryWithParts()
  }
}
