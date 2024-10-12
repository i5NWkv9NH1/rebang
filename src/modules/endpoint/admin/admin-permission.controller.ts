import { Get } from '@nestjs/common'
import { BaseCrudController } from 'src/common/abstracts/base-crud-controller.abstract'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { CreatePermissionDto } from 'src/modules/rbac/permission/dto/create-permission.dto'
import { Permission } from 'src/modules/rbac/permission/entities/permission.entity'
import { PermissionService } from 'src/modules/rbac/permission/services/permission.service'

@UseAdminController('permissions', ['1', '2'])
export class AdminPermissionController extends BaseCrudController<
  Permission,
  CreatePermissionDto,
  {}
> {
  constructor(private readonly permissionService: PermissionService) {
    super(permissionService)
  }
}
