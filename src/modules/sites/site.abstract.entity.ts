import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export abstract class SiteAbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string
  @CreateDateColumn({ type: 'timestamptz' })
  public createdDate: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedDate: Date
}
