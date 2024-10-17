import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseCrudService } from 'src/common/abstracts/base-crud-service.abstract'
import { Resource, ResourceType } from '../entities/resource.entity'
import {
  Brackets,
  DeepPartial,
  FindTreeOptions,
  IsNull,
  Like,
  Not,
  Repository,
  SelectQueryBuilder,
  TreeRepository
} from 'typeorm'
import { CreateResourceDto } from '../dto/create-resource.dto'

@Injectable()
export class ResourceService extends BaseCrudService<Resource> {
  protected readonly logger = new Logger(ResourceService.name)

  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: TreeRepository<Resource>
  ) {
    super(resourceRepository)
  }

  public getResourceRepository(): TreeRepository<Resource> {
    return super.getRepository<TreeRepository<Resource>>()
  }

  protected createQueryBuilder(
    alias = 'resource'
  ): SelectQueryBuilder<Resource> {
    return this.resourceRepository.createQueryBuilder(alias)
  }

  protected applyFilter(qb: SelectQueryBuilder<Resource>, filter): void {
    Object.keys(filter).forEach((key) => {
      const value = filter[key]
      if (!value) return
      switch (key) {
        default:
          break
      }
    })
  }

  protected applyCustom(qb: SelectQueryBuilder<Resource>) {
    // qb.orderBy('permssion.sort', 'DESC')
  }

  async create(dto: CreateResourceDto) {
    const entity = this.resourceRepository.create(dto)
    if (dto.parentId) {
      const parent = await this.findOne({ where: { id: dto.parentId } })
      entity.parent = parent
    }
    return await this.resourceRepository.save(entity)
  }

  async createGroup(dto: CreateResourceDto) {
    //* Unique path & name
    const exist = await this.createQueryBuilder()
      .where('resource.type = :type', { type: ResourceType.Group })
      .andWhere(
        new Brackets((qb) => {
          qb.andWhere('resource.path = :path', {
            path: dto.path
          })
            .orWhere('resource.name = :name', {
              name: dto.name
            })
            .orWhere('resource.view = :view', { view: dto.view })
        })
      )
      .getOne()

    if (exist) {
      this.logger.debug('Exist', exist)
      throw new BadRequestException('Path or Name Exist')
    }

    if (dto.parentId) {
      const parent = await this.findOneWithThrow({
        where: { id: dto.parentId }
      })
      const entity = this.resourceRepository.create(dto)

      entity.parent = parent

      return await this.resourceRepository.save(entity)
    }

    return await this.resourceRepository.save(dto)
  }

  async findGroups() {
    const groups = await this.findOne({
      where: { type: ResourceType.Group },
      relations: ['children']
    })
    return groups
  }

  async findPagesByGroup(id: string) {
    const entity = await this.findOneWithThrow({
      where: { id, type: ResourceType.Group }
    })
    // return await this.findDescendantsTree(entity, options)
    return await this.createDescendantsQueryBuilder('r', 'rc', entity)
      .where('rc.id_ancestor = :groupId', { groupId: entity.id })
      .andWhere('r.type = :type', { type: ResourceType.Page })
      .getMany()
  }

  async createPage(dto: CreateResourceDto) {
    //* Unique path & name
    const exist = await this.createQueryBuilder()
      .where('resource.type = :type', { type: ResourceType.Page })
      .andWhere(
        new Brackets((qb) => {
          qb.andWhere('resource.path = :path', {
            path: dto.path
          }).orWhere('resource.name = :name', {
            name: dto.name
          })
        })
      )
      .getOne()

    if (exist) {
      throw new BadRequestException('Path or Name Exist')
    }

    if (dto.parentId) {
      const parent = await this.findOneWithThrow({
        where: { id: dto.parentId }
      })
      const entity = this.resourceRepository.create(dto)

      entity.parent = parent

      return await this.resourceRepository.save(entity)
    }

    return await this.resourceRepository.save(dto)
  }

  async createAction(dto: CreateResourceDto) {
    //* Unique path & name
    const exist = await this.createQueryBuilder()
      .where('resource.type = :type', { type: ResourceType.Action })
      .andWhere('resource.code = :code', {
        code: dto.code
      })
      .getOne()

    if (exist) {
      throw new BadRequestException('Code Exist')
    }

    if (dto.parentId) {
      const parent = await this.findOneWithThrow({
        where: { id: dto.parentId }
      })
      const entity = this.resourceRepository.create(dto)

      entity.parent = parent

      return await this.resourceRepository.save(entity)
    }

    return await this.resourceRepository.save(dto)
  }

  //* Wrapper
  /**
   * @description 返回数据库中的所有树及其所有子树、子树的子树等。
   * @param {FindTreeOptions} options { relations, depth }
   * @returns 返回包含后代的根
   */
  public async findTrees(options?: FindTreeOptions) {
    return await this.resourceRepository.findTrees(options)
  }
  /**
   * @description 根是没有祖先的实体，找到他们所有人，不包含各自的 children
   * @param {FindTreeOptions} options { relations, depth }
   */
  public async findRoots(options?: FindTreeOptions) {
    return await this.resourceRepository.findRoots(options)
  }
  /**
   * @description 获取给定实体的所有子代(后代)。
   * @param {Resource} entity
   * @param {FindTreeOptions} options
   * @returns 以平面数组的形式返回它们
   */
  public async findDescendants(entity: Resource, options?: FindTreeOptions) {
    return await this.resourceRepository.findDescendants(entity, options)
  }
  /**
   * @description 获取给定实体的所有子代(后代)。
   * @param {Resource} entity
   * @param {FindTreeOptions} options
   * @returns 以树的形式返回它们——相互嵌套。
   */
  public async findDescendantsTree(
    entity: Resource,
    options?: FindTreeOptions
  ) {
    return await this.resourceRepository.findDescendantsTree(entity, options)
  }
  /**
   * @description 创建用于获取树中实体后代的查询生成器。
   * @param alias 别名
   * @param closureTableAlias 闭包表别名
   * @param entity 实体
   * @returns {SelectQueryBuilder<Resource>}
   */
  public createDescendantsQueryBuilder(
    alias: string,
    closureTableAlias: string,
    entity: Resource
  ): SelectQueryBuilder<Resource> {
    return this.resourceRepository.createDescendantsQueryBuilder(
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
  public async countDescendants(entity: Resource): Promise<number> {
    return await this.resourceRepository.countDescendants(entity)
  }
  /**
   * @description 获取给定实体的所有父代(祖先)。
   * @param {Resource} entity
   * @param {FindTreeOptions} options
   * @returns {Resource[]} 以平面数组的形式返回它们。
   */
  public async findAncestors(
    entity: Resource,
    options: FindTreeOptions
  ): Promise<Resource[]> {
    return await this.resourceRepository.findAncestors(entity, options)
  }
  /**
   * @description 获取给定实体的所有父代(祖先)。
   * @param {Resource} entity
   * @param {FindTreeOptions} options
   * @returns 以树的形式返回它们——相互嵌套
   */
  public async findAncestorsTree(entity: Resource, options?: FindTreeOptions) {
    return await this.resourceRepository.findAncestorsTree(entity, options)
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
    entity: Resource
  ) {
    return this.resourceRepository.createAncestorsQueryBuilder(
      alias,
      closureTableAlias,
      entity
    )
  }
  /**
   * @description 获取实体的祖先数。
   * @param {Resource} entity
   * @returns {Promise<number>}
   */
  public async countAncestors(entity: Resource): Promise<number> {
    return await this.resourceRepository.countAncestors(entity)
  }

  protected async beforeCreate(
    dto: DeepPartial<Resource>,
    entity: Resource
  ): Promise<void> {}
  protected async beforeUpdate<Dto>(entity: Resource, dto): Promise<void> {}
  protected beforeSoftRemove(entity: Resource): Promise<void> | void {}
  protected beforeRecover(entity: Resource): Promise<void> | void {}
  protected beforeRemove(entity: Resource): Promise<void> | void {}

  public buildGroupTree(items: Resource[]): any[] {
    const groupsMap = new Map<string, any>()
    const rootGroups: any[] = []

    items.forEach((item) => {
      groupsMap.set(item.id, { ...item, children: [] })
    })

    // Now build the tree
    items.forEach((item) => {
      if (item.type === 'Group') {
        const groupItem = groupsMap.get(item.id)
        if (item.parent) {
          const parentItem = groupsMap.get(item.parent.id)
          if (parentItem) {
            // If a parent exists, add this group to its parent's children
            parentItem.children.push(groupItem)
          }
        } else {
          // If no parentId, this is a root group
          rootGroups.push(groupItem)
        }
      }
    })

    return rootGroups
  }
}
