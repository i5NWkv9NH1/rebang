import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('bilibili')
export class BilibiliEntity extends SiteAbstractEntity {}
