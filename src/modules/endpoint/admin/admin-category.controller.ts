import { BaseCrudController } from 'src/common/abstracts/base-crud-controller.abstract'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { CategoryService } from 'src/modules/bussiness/category/category.service'
import { Category } from 'src/modules/bussiness/category/entities/category.entity'

@UseAdminController('categories', ['1'])
export class AdminCategoryController extends BaseCrudController<
  Category,
  {},
  {}
> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService)
  }
}
