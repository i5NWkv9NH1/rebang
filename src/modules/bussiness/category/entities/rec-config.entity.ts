import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Entity, ManyToOne } from 'typeorm'
import { Category } from './category.entity'
import { Part } from '../../website/entities/part.entity'

/**
 * @description 不需要反向关联
 */
@Entity('rec_config')
export class RecConfig extends AbstractBaseEntity {
  @ManyToOne(() => Category, (category) => category.id)
  category: Category

  @ManyToOne(() => Part, (part) => part.id)
  part: Part
}
