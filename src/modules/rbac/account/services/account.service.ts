import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Account } from '../entities/account.entity'
import {
  DeepPartial,
  FindOneOptions,
  ILike,
  Repository,
  SelectQueryBuilder
} from 'typeorm'
import { CreateAccountDto } from '../dto/create-account.dto'
import { compare, hash } from 'bcrypt'
import { UpdatePasswordDto } from '../dto/update-password.dto'
import { BaseCrudService } from 'src/common/abstracts/base-crud-service.abstract'
import { FilterParam } from 'src/common/dto/filter.dto'

export interface AccountFilter extends FilterParam {
  username: string
}

@Injectable()
export class AccountSerivce extends BaseCrudService<Account> {
  protected readonly logger = new Logger(AccountSerivce.name)

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {
    super(accountRepository)
  }

  protected createQueryBuilder(): SelectQueryBuilder<Account> {
    const qb = this.accountRepository.createQueryBuilder('account')
    return qb
  }

  protected applyFilter(qb: SelectQueryBuilder<Account>, filter): void {
    Object.keys(filter).forEach((key) => {
      const value = filter[key]
      if (!value) return
      switch (key) {
        default:
          break
      }
    })
  }

  protected applyCustom(qb: SelectQueryBuilder<Account>) {
    qb.orderBy('account.sort', 'DESC')
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const entity = await this.accountRepository.findOne({
      where: { id }
    })
    if (!entity) {
      throw new BadRequestException('Account not found')
    }

    const diff = await compare(dto.oldPassword, entity.password)
    if (!diff) {
      throw new BadRequestException('Password incorrect')
    }

    const hashed = await hash(dto.newPassword, 10)
    entity.password = hashed
    entity.originPassword = dto.newPassword

    return await this.accountRepository.save(entity)
  }

  protected async beforeCreate(dto: CreateAccountDto, entity: Account) {
    const exist = await this.findOneByUsername(dto.username)
    if (exist) {
      throw new BadRequestException('Account exist')
    }

    const hashed = await hash(dto.password, 10)
    entity.username = dto.username
    entity.password = hashed
    entity.originPassword = dto.password
  }

  async findOneByUsername(username: string, options?: FindOneOptions<Account>) {
    return await this.findOne({
      where: { username: ILike(`%${username}`) },
      ...options
    })
  }

  protected beforeUpdate<Dto>(
    entity: Account,
    dto: Dto
  ): Promise<void> | void {}
  protected beforeSoftRemove(entity: Account): Promise<void> | void {}
  protected beforeRecover(entity: Account): Promise<void> | void {}
  protected beforeRemove(entity: Account): Promise<void> | void {}
}
