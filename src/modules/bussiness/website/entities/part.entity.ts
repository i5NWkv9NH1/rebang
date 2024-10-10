import { AbstractBaseEntity } from 'src/shared/entities/base.entity'
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Relation
} from 'typeorm'
import { Website } from './website.entity'
import { PartScraped } from './part-scraped.entity'
import { PartConfig } from './part-config.entity'
import { Category } from '../../category/entities/category.entity'

@Entity('part')
export class Part extends AbstractBaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  title: string

  @ManyToOne(() => Website, (_) => _.parts)
  website: Relation<Website>

  @ManyToMany(() => Category, (_) => _.parts)
  categories: Relation<Category[]>

  @OneToMany(() => PartScraped, (_) => _.part)
  scraped: Relation<PartScraped[]>

  @OneToMany(() => PartConfig, (_) => _.part)
  configs: Relation<PartConfig[]>

  @Column({ nullable: true })
  activedConfigId: string
}
