import { IsArray, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { Permission } from '../../permission/entities/permission.entity'

export class UpdateRolePermissionsDto {
  @IsArray()
  @IsString({ each: true })
  permissionIds: string[]
}
