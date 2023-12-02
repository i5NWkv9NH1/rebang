import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('juejin')
export class JuejinEntity extends SiteAbstractEntity {}
