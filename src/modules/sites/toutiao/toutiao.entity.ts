import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('toutiao')
export class ToutiaoEntity extends SiteAbstractEntity {}
