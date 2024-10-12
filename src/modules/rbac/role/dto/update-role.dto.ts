import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BaseDto } from 'src/common/abstracts/base-crud-controller.abstract'

export class UpdateRoleDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  title: string
}
