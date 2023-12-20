import { Column, Entity } from 'typeorm'
import { ZhihuItem } from './zhihu.type'
import { BaseSiteEntity } from 'src/shared/base-site.entity'

// @Entity('zhihu')
export class ZhihuEntity extends BaseSiteEntity {}
