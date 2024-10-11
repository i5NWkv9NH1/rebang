import {
  Column,
  CreateDateColumn,
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
}
