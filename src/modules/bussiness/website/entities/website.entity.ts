import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  Relation
} from 'typeorm'
import { Category } from '../../category/entities/category.entity'
import { Part } from './part.entity'

@Entity('b_website')
export class Website extends AbstractBaseEntity {
  @Column({ nullable: false })
  url: string

  @Index()
  @Column({ nullable: false, unique: true, comment: '网站唯一代码' })
  name: string

  @Column({ nullable: false, comment: '网站标题' })
  title: string

  @Column({ nullable: true })
  icon: string

  @ManyToMany(() => Category, (category) => category.websites)
  @JoinTable({
    name: 'b_website_categories', // 中间表的名称
    joinColumn: {
      name: 'website_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id'
    }
  })
  categories: Relation<Category[]>

  @OneToMany(() => Part, (part) => part.website)
  parts: Relation<Part[]>
}
