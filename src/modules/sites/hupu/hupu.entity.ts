import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('hupu')
export class HupuEntity extends SiteAbstractEntity {}
