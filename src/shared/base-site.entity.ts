import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export abstract class BaseSiteEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string
  @CreateDateColumn({ type: 'timestamptz' })
  public createdDate: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedDate: Date
}
