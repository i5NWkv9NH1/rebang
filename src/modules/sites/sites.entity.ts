import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sites')
export class SitesEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string

  @Column('varchar')
  name: string

  @Index()
  @Column('varchar')
  value: string

  @Column('varchar', { nullable: true })
  icon?: string

  @Column('json')
  childrens: []
}
