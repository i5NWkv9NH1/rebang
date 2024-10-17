import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf
} from 'class-validator'
import { Resource, ResourceType } from '../entities/resource.entity'

export class CreateResourceDto {
  @IsUUID('all', { each: true })
  @IsOptional()
  parentId: string //? 上级节点

  @IsString()
  @IsOptional()
  title: string //? 名称

  @IsEnum(ResourceType)
  type: ResourceType //? 实体类型

  @IsBoolean()
  @IsOptional()
  status: boolean //? 状态

  @IsString()
  @IsOptional()
  icon: string

  //* 目录（布局）字段
  //#region 目录（布局）字段
  @IsString()
  @IsOptional()
  // @ValidateIf((entity: Resource, _value) => entity.type === ResourceType.Page)
  redirect: string
  //#endregion
  //* 目录（布局）& 页面（路由）共用
  @IsString()
  @ValidateIf((entity: Resource, _value) => entity.type !== ResourceType.Action)
  path: string

  @IsBoolean()
  @IsOptional()
  // @ValidateIf((entity: Resource, _value) => entity.type !== ResourceType.Action)
  hidden: boolean

  //* 页面（路由）字段
  //#region 页面（路由）字段
  @IsString()
  @ValidateIf((entity: Resource, _value) => entity.type === ResourceType.Page)
  view: string //? 页面 vue 文件

  @IsString()
  @ValidateIf((entity: Resource, _value) => entity.type === ResourceType.Page)
  name: string //? 页面命名 definePage({ name })

  @IsBoolean()
  @IsOptional()
  // @ValidateIf((entity: Resource, _value) => entity.type === ResourceType.Page)
  affix: boolean

  @IsBoolean()
  @IsOptional()
  // @ValidateIf((entity: Resource, _value) => entity.type === ResourceType.Page)
  newWindow: boolean

  @IsBoolean()
  @IsOptional()
  // @ValidateIf((entity: Resource, _value) => entity.type === ResourceType.Page)
  external: boolean //? 链接外显

  @IsString()
  @ValidateIf(
    (entity: Resource, _value) =>
      entity.type === ResourceType.Page && entity.external
  )
  link: string //? 外链链接

  @IsBoolean()
  @IsOptional()
  // @ValidateIf((entity: Resource, _value) => entity.type === ResourceType.Page)
  keepAlive: boolean //? 缓存
  //#endregion

  //* 权限操作字段
  //#region 权限操作字段
  @IsString()
  @ValidateIf((entity: Resource, _value) => entity.type === ResourceType.Action)
  code: string //* 权限操作唯一代码'
  //#endregion
}

export class UpdateResourceDto extends CreateResourceDto {}
