import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('xueqiu')
export class XueqiuEntity extends SiteAbstractEntity {}
