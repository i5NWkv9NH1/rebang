import {
  AfterUpdate,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export abstract class AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string

  @Column({
    type: 'int',
    name: 'sort',
    default: 1
  })
  sort: number

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string

  @CreateDateColumn({
    type: 'time with time zone',
    name: 'created_at'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'time with time zone',
    name: 'updated_at'
  })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'time with time zone' })
  deletedAt?: Date
}

export abstract class BaseEntity extends AbstractBaseEntity {}
