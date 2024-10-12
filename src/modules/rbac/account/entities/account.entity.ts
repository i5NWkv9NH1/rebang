import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, Index, ManyToMany } from 'typeorm'
import { Role } from '../../role/entities/role.entity'
import { Gender } from 'src/@types/gender'

@Entity('s_account')
export class Account extends AbstractBaseEntity {
  @Column({ type: 'varchar', nullable: true })
  nickname: string

  @Index()
  @Column({ type: 'varchar', unique: true })
  username: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'varchar', nullable: true })
  originPassword: string

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string

  @Column({ type: 'varchar', unique: true, nullable: true })
  phoneNumber: string

  @Column({ type: 'varchar', unique: true, nullable: true })
  weChatId: string

  @Column({ type: 'enum', enum: Gender, default: Gender.Private })
  gender: Gender

  @ManyToMany(() => Role, (role) => role.accounts)
  roles: Role[]
}
