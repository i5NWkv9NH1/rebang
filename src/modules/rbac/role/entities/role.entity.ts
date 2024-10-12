import { Status } from 'src/@types'
import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, Index, JoinTable, ManyToMany, Relation } from 'typeorm'
import { Account } from '../../account/entities/account.entity'
import { Permission } from '../../permission/entities/permission.entity'

@Entity('s_role')
export class Role extends AbstractBaseEntity {
  @Index()
  @Column({ type: 'varchar', unique: true })
  name: string

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'enum', enum: Status, default: Status.Enabled })
  status: Status

  @ManyToMany(() => Account, (_) => _.roles, { cascade: true })
  @JoinTable({
    name: 's_account_role',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'account_id', referencedColumnName: 'id' }
  })
  accounts: Relation<Account[]>

  @ManyToMany(() => Permission, (_) => _.roles, { cascade: true })
  @JoinTable({
    name: 's_role_permission',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' }
  })
  permissions: Relation<Permission[]>
}
