import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('ssp')
export class SspEntity extends SiteAbstractEntity {}
