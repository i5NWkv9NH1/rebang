import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('jiandan')
export class JiandanEntity extends SiteAbstractEntity {}
