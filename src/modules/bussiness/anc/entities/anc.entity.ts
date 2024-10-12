import { Status } from 'src/@types'
import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('b_anc')
export class Anc extends AbstractBaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'enum', enum: Status, default: Status.Disabled })
  status: Status
}
