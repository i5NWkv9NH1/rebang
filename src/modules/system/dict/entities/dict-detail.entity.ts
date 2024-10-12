import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, ManyToOne, Relation } from 'typeorm'
import { Dict } from './dict.entity'

@Entity('s_dict_detail')
export class DictItem extends AbstractBaseEntity {
  @Column({ type: 'varchar' })
  code: string

  @Column({ type: 'varchar' })
  value: string

  @Column({ type: 'varchar' })
  name: string

  @ManyToOne(() => Dict, (_) => _.items)
  dict: Relation<Dict>
}
