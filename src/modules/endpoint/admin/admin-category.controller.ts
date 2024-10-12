import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException
} from '@nestjs/common'
import { BaseCrudController } from 'src/common/abstracts/base-crud-controller.abstract'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { CategoryService } from 'src/modules/bussiness/category/category.service'
import { CreateCategoryDto } from 'src/modules/bussiness/category/dto/create-category.dto' // DTO for creating a category
import { UpdateCategoryDto } from 'src/modules/bussiness/category/dto/update-category.dto' // DTO for updating a category
import { Category } from 'src/modules/bussiness/category/entities/category.entity'

@UseAdminController('categories', ['1', '2'])
export class AdminCategoryController extends BaseCrudController<
  Category,
  {},
  {}
> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService)
  }
}
