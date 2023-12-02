import { Column, Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'
import { BaiduRankTab } from './baidu.constant'

@Entity('baidu')
export class BaiduEntity extends SiteAbstractEntity {
  @Column({ type: 'enum', enum: BaiduRankTab, default: BaiduRankTab.RealTime })
  tab: BaiduRankTab
}
