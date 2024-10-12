import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'
import { PermissionType } from '../entities/permission.entity'

export class CreatePermissionDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsNotEmpty()
  code: string

  @IsEnum(PermissionType)
  type: PermissionType

  @IsString()
  @IsOptional()
  redirect: string

  @IsString()
  @IsOptional()
  icon: string

  @IsString()
  @IsOptional()
  path: string

  @IsString()
  @IsOptional()
  view: string

  @IsBoolean()
  @IsOptional()
  keepAlive: boolean

  @IsBoolean()
  @IsOptional()
  affix: boolean

  @IsBoolean()
  @IsOptional()
  newWindow: boolean

  @IsBoolean()
  @IsOptional()
  external: boolean

  @IsOptional()
  @IsString()
  parentId: string
}

export class CreatePermissionGroup {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  path: string

  @IsString()
  @IsOptional()
  redirect: string

  @IsString()
  @IsOptional()
  icon: string

  @IsInt()
  @IsOptional()
  sort: number

  @IsString()
  @IsOptional()
  parentId: string
}
