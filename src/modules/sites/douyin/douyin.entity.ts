import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('douyin')
export class DouyinEntity extends SiteAbstractEntity {}
