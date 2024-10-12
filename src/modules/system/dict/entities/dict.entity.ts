import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, OneToMany, OneToOne, Relation } from 'typeorm'
import { DictItem } from './dict-detail.entity'

export enum DictStatus {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

@Entity('s_dict')
export class Dict extends AbstractBaseEntity {
  @Column({ type: 'varchar', nullable: true, default: null })
  code: string

  @Column({ type: 'varchar', nullable: true, default: null })
  name: string

  @Column({ type: 'enum', enum: DictStatus, default: DictStatus.Enabled })
  status: DictStatus

  @OneToMany(() => DictItem, (_) => _.dict)
  items: Relation<DictItem[]>
}
