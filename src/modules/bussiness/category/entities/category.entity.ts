import { AbstractBaseEntity } from 'src/shared/entities/base.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Relation
} from 'typeorm'
import { Website } from '../../website/entities/website.entity'
import { Part } from '../../website/entities/part.entity'

@Entity('category')
export class Category extends AbstractBaseEntity {
  @Column({ nullable: true })
  icon: string

  @Column()
  name: string

  @Column({ type: 'varchar', nullable: true })
  title: string

  @ManyToMany(() => Website, (website) => website.categories)
  websites: Relation<Website[]>

  @ManyToMany(() => Part, (_) => _.categories)
  @JoinTable({ name: 'category_parts' })
  parts: Relation<Part[]>

  // @Column({ type: 'simple-array', nullable: true, select: false })
  // websiteIds: string[]

  // @Column({ type: 'simple-array', nullable: true, select: false })
  // partIds: string[]
}
