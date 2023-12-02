import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('history')
export class HistoryEntity extends SiteAbstractEntity {}
