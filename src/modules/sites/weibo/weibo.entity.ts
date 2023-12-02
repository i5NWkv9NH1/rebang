import { Entity } from 'typeorm'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('weibo')
export class WeiboEntity extends SiteAbstractEntity {}
