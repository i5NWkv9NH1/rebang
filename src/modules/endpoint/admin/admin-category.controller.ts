import { Controller, Get, Param } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryService } from 'src/modules/bussiness/category/category.service'
import { Category } from 'src/modules/bussiness/category/entities/category.entity'
import { Repository } from 'typeorm'

@Controller('categories')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return await this.categoryService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {}
}
