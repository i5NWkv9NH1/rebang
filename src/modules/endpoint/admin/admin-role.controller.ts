import { Body, Get, Param, Patch, Put } from '@nestjs/common'
import {
  BaseCrudController,
  IdParamsDto
} from 'src/common/abstracts/base-crud-controller.abstract'
import { UseAdminController } from 'src/common/decorators/router/admin-router.decorator'
import { CreateRoleDto } from 'src/modules/rbac/role/dto/create-role.dto'
import { Role } from 'src/modules/rbac/role/entities/role.entity'
import { RoleService } from 'src/modules/rbac/role/services/role.service'

@UseAdminController('roles', ['1', '2'])
export class AdminRoleContoller extends BaseCrudController<
  Role,
  CreateRoleDto,
  {}
> {
  constructor(private readonly roleService: RoleService) {
    super(roleService)
  }

  @Get(':id')
  async findOne(@Param() params: IdParamsDto) {
    const { id } = params
    return await this.service.findOneByIdWithThrow(id, {
      relations: ['accounts']
    })
  }

  @Patch(':id/permissions')
  async updaePermissionById(@Param() params: IdParamsDto, @Body() dto) {}
}
