import { Column, Entity } from 'typeorm'
import { ZhihuDailyItem } from './zhihu-daily.type'
import { BaseSiteEntity } from 'src/shared/base-site.entity'

// @Entity('zhihu-daily')
export class ZhihuDailyEntity extends BaseSiteEntity {}
