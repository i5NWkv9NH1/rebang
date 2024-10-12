import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  Relation,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm'
import { Role } from '../../role/entities/role.entity'
import { Status } from 'src/@types'

export enum PermissionType {
  Group = 'Group',
  Page = 'Page',
  Action = 'Action'
}

@Entity('s_permission')
@Tree('closure-table')
@Index(['code', 'type'])
export class Permission extends AbstractBaseEntity {
  @Column({ type: 'varchar', nullable: true })
  title: string

  @Column({ type: 'varchar', unique: true })
  code: string

  @Column({ type: 'varchar', nullable: true })
  name: string

  @Column({ type: 'enum', enum: Status, default: Status.Enabled })
  status: Status

  @Column({ type: 'enum', enum: PermissionType, default: PermissionType.Group })
  type: PermissionType

  //* 如果是目录（分组）和页面（路由）
  @Column({ type: 'varchar', nullable: true })
  redirect: string

  //* 目录（分组）和页面（路由）
  @Column({ type: 'varchar', nullable: true })
  icon: string

  //* 如果是页面（路由）
  @Column({ type: 'varchar', nullable: true })
  path: string

  //* 如果是页面（路由）外链
  @Column({ type: 'varchar', nullable: true })
  link: string

  //* 前端的渲染的 Vue 文件路径
  @Column({ type: 'varchar', nullable: true })
  view: string

  //* 是否在前端缓存目录（分组）和页面（路由）
  @Column({ type: 'boolean', default: true })
  keepAlive: boolean

  //* 是否在前端页面固定页签
  @Column({ type: 'boolean', default: false })
  affix: boolean

  //* 是否在新窗口打开
  @Column({ type: 'boolean', name: 'new_window', default: false })
  newWindow: boolean

  //* 是否为外链，为 True 时搭配 link 使用
  @Column({ type: 'boolean', default: false })
  external: boolean

  // Tree 结构，表示当前节点的子权限
  @TreeChildren()
  children: Relation<Permission[]>

  // Tree 结构，表示当前节点的父权限
  @TreeParent()
  parent: Relation<Permission>

  // 权限与角色的多对多关系
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Relation<Role[]>
}
