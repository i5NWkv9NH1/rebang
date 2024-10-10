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

  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
}
