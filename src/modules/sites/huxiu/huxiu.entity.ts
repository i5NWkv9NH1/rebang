import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('huxiu')
export class HuxiuEntity extends SiteAbstractEntity {}
