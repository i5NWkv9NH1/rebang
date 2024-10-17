import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { BaseCrudService } from 'src/common/abstracts/base-crud-service.abstract'
import { Role } from '../entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Like, Repository, SelectQueryBuilder } from 'typeorm'
import { CreateRoleDto } from '../dto/create-role.dto'
import { UpdateRoleResourcesDto } from '../dto/update-role-permissions.dto'
import { ResourceService } from '../../resource/services/resource.service'

@Injectable()
export class RoleService extends BaseCrudService<Role> {
  protected readonly logger = new Logger(RoleService.name)

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly permissionService: ResourceService
  ) {
    super(roleRepository)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Role> {
    const qb = this.roleRepository.createQueryBuilder('role')
    return qb
  }

  protected applyFilter(qb: SelectQueryBuilder<Role>, filter): void {
    Object.keys(filter).forEach((key) => {
      const value = filter[key]
      if (!value) return
      switch (key) {
        default:
          break
      }
    })
  }

  protected applyCustom(qb: SelectQueryBuilder<Role>) {
    qb.orderBy('role.sort', 'DESC')
  }

  async updateRoleResources(id: string, dto: UpdateRoleResourcesDto) {
    const role = await this.findOneByIdWithThrow(id)
  }

  protected async beforeCreate(
    dto: CreateRoleDto,
    entity: Role
  ): Promise<void> {
    const _entity = await this.findOne({
      where: { name: ILike(`%${dto.name}%`) }
    })
    if (_entity) {
      throw new BadRequestException('Role exist')
    }
  }
  protected async beforeUpdate(entity: Role, dto): Promise<void> {
    this.logger.debug(JSON.stringify(entity), JSON.stringify(dto))
    const _entity = await this.findOne({
      where: { name: Like(`%${dto.name}%`) }
    })
    if (_entity) {
      throw new BadRequestException('Role name exist')
    }
  }
  protected beforeSoftRemove(entity: Role): Promise<void> | void {}
  protected beforeRecover(entity: Role): Promise<void> | void {}
  protected beforeRemove(entity: Role): Promise<void> | void {}
}
