import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, OneToOne, Relation } from 'typeorm'
import { Ad } from './ad.entity'

@Entity('ad-stat')
export class AdStat extends AbstractBaseEntity {
  @Column({ type: 'integer', default: 0 })
  views: number

  @Column({ type: 'interval', default: 0 })
  clicks: number

  @OneToOne(() => Ad, (_) => _.stat)
  ad: Relation<Ad>
}
