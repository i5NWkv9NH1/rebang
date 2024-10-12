import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseCrudService } from 'src/common/abstracts/base-crud-service.abstract'
import { Permission } from '../entities/permission.entity'
import {
  DeepPartial,
  FindTreeOptions,
  Repository,
  SelectQueryBuilder,
  TreeRepository
} from 'typeorm'
import {
  CreatePermissionDto,
  CreatePermissionGroup
} from '../dto/create-permission.dto'

@Injectable()
export class PermissionService extends BaseCrudService<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: TreeRepository<Permission>
  ) {
    super(permissionRepository)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Permission> {
    return this.permissionRepository.createQueryBuilder('permission')
  }

  protected applyFilter(qb: SelectQueryBuilder<Permission>, filter): void {
    Object.keys(filter).forEach((key) => {
      const value = filter[key]
      if (!value) return
      switch (key) {
        default:
          break
      }
    })
  }

  protected applyCustom(qb: SelectQueryBuilder<Permission>) {
    // qb.orderBy('permssion.sort', 'DESC')
  }

  async create(dto: CreatePermissionDto) {
    this.logger.debug('Create')
    const entity = this.permissionRepository.create(dto)
    this.logger.debug('Created', JSON.stringify(entity))

    if (dto.parentId) {
      const parent = await this.findOne({ where: { id: dto.parentId } })
      entity.parent = parent
    }

    return await this.permissionRepository.save(entity)
  }

  async createPermissionGroup(dto: CreatePermissionGroup) {
    if (dto.parentId) {
    }
  }

  //* Wrapper
  /**
   * @description 返回数据库中的所有树及其所有子树、子树的子树等。
   * @param {FindTreeOptions} options { relations, depth }
   * @returns 返回包含后代的根
   */
  public async findTrees(options?: FindTreeOptions) {
    return await this.permissionRepository.findTrees(options)
  }
  /**
   * @description 根是没有祖先的实体，找到他们所有人，不包含各自的 children
   * @param {FindTreeOptions} options { relations, depth }
   */
  public async findRoots(options?: FindTreeOptions) {
    return await this.permissionRepository.findRoots(options)
  }
  /**
   * @description 获取给定实体的所有子代(后代)。
   * @param {Permission} entity
   * @param {FindTreeOptions} options
   * @returns 以平面数组的形式返回它们
   */
  public async findDescendants(entity: Permission, options?: FindTreeOptions) {
    return await this.permissionRepository.findDescendants(entity, options)
  }

  /**
   * @description 获取给定实体的所有子代(后代)。
   * @param {Permission} entity
   * @param {FindTreeOptions} options
   * @returns 以树的形式返回它们——相互嵌套。
   */
  public async findDescendantsTree(
    entity: Permission,
    options?: FindTreeOptions
  ) {
    return await this.permissionRepository.findDescendantsTree(entity, options)
  }
  /**
   * @description 创建用于获取树中实体后代的查询生成器。
   * @param alias 别名
   * @param closureTableAlias 闭包表别名
   * @param entity 实体
   * @returns {SelectQueryBuilder<Permission>}
   */
  public createDescendantsQueryBuilder(
    alias: string,
    closureTableAlias: string,
    entity: Permission
  ): SelectQueryBuilder<Permission> {
    return this.permissionRepository.createDescendantsQueryBuilder(
      alias,
      closureTableAlias,
      entity
    )
  }
  /**
   * @description 获取该实体的后代的数目。
   * @param entity
   * @returns {Promise<number>}
   */
  public async countDescendants(entity: Permission): Promise<number> {
    return await this.permissionRepository.countDescendants(entity)
  }
  /**
   * @description 获取给定实体的所有父代(祖先)。
   * @param {Permission} entity
   * @param {FindTreeOptions} options
   * @returns {Permission[]} 以平面数组的形式返回它们。
   */
  public async findAncestors(
    entity: Permission,
    options: FindTreeOptions
  ): Promise<Permission[]> {
    return await this.permissionRepository.findAncestors(entity, options)
  }
  /**
   * @description 获取给定实体的所有父代(祖先)。
   * @param {Permission} entity
   * @param {FindTreeOptions} options
   * @returns 以树的形式返回它们——相互嵌套
   */
  public async findAncestorsTree(
    entity: Permission,
    options?: FindTreeOptions
  ) {
    return await this.permissionRepository.findAncestorsTree(entity, options)
  }
  /**
   * @description 创建一个查询生成器，用于获取树中实体的祖先。
   * @param alias 别名
   * @param closureTableAlias
   * @param entity 实体
   * @returns
   */
  public createAncestorsQueryBuilder(
    alias: string,
    closureTableAlias: string,
    entity: Permission
  ) {
    return this.permissionRepository.createAncestorsQueryBuilder(
      alias,
      closureTableAlias,
      entity
    )
  }
  /**
   * @description 获取实体的祖先数。
   * @param {Permission} entity
   * @returns {Promise<number>}
   */
  public async countAncestors(entity: Permission): Promise<number> {
    return await this.permissionRepository.countAncestors(entity)
  }

  protected async beforeCreate(
    dto: DeepPartial<Permission>,
    entity: Permission
  ): Promise<void> {}
  protected async beforeUpdate<Dto>(entity: Permission, dto): Promise<void> {}
  protected beforeSoftRemove(entity: Permission): Promise<void> | void {}
  protected beforeRecover(entity: Permission): Promise<void> | void {}
  protected beforeRemove(entity: Permission): Promise<void> | void {}
}
