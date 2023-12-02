import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('tieba')
export class TiebaEntity extends SiteAbstractEntity {}
