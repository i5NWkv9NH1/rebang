import { Column, Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'
import { ZhihuDailyItem } from './zhihu-daily.type'

@Entity('zhihu-daily')
export class ZhihuDailyEntity extends SiteAbstractEntity {
  @Column({ type: 'jsonb', default: [], nullable: true })
  public items: ZhihuDailyItem[]
}
