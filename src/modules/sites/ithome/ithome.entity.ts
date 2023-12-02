import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('ithome')
export class ITHomeEntity extends SiteAbstractEntity {}
