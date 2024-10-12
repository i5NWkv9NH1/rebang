import { Status } from 'src/@types'
import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm'

@Entity('s_region')
export class Region extends AbstractBaseEntity {
  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar' })
  pinyin: string

  @Column({ type: 'varchar' })
  pinyinFirst: string

  @Column({ type: 'int' })
  level: number

  @Column({ default: false })
  leaf: boolean

  @Column({ type: 'enum', enum: Status, default: Status.Enabled })
  status: Status

  @Column({ type: 'boolean', default: false })
  hot: boolean

  @Column({ type: 'uuid', nullable: true, default: null })
  parentId: string | null

  @Column('simple-array', { nullable: true })
  parentIdList: string[]

  @ManyToOne(() => Region, (_) => _.children, { nullable: true })
  parent: Relation<Region> | null

  @OneToMany(() => Region, (_) => _.parent, { nullable: true })
  children: Relation<Region[]>
}
