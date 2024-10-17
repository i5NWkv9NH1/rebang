import { IsArray, IsString, ValidateNested } from 'class-validator'

export class UpdateRoleResourcesDto {
  @IsArray()
  @IsString({ each: true })
  permissionIds: string[]
}
