import { Column, Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'
import { ZhihuItem } from './zhihu.type'

@Entity('zhihu')
export class ZhihuEntity extends SiteAbstractEntity {
  @Column({ type: 'jsonb', default: [], nullable: true })
  public data: ZhihuItem[]
}
