import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('weread')
export class WereadEntity extends SiteAbstractEntity {}
