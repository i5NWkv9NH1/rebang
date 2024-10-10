import { AbstractBaseEntity } from 'src/shared/entities/base.entity'
import { Column, Entity, OneToOne, Relation } from 'typeorm'
import { AdStat } from './ad-stat.entity'

export enum AdType {
  Image = 'Image',
  Video = 'Video',
  Text = 'Text',
  Banner = 'Banner'
}

@Entity('ad')
export class Ad extends AbstractBaseEntity {
  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'text', nullable: true })
  content: string

  @Column({ type: 'varchar', name: 'resource_url' })
  resourceUrl: string

  @Column({ type: 'varchar', name: 'link_url' })
  linkUrl: string

  @Column({ type: 'enum', enum: AdType, default: AdType.Image })
  type: AdType

  @Column({ type: 'integer', default: 0 })
  width: number
  @Column({ type: 'integer', default: 0 })
  height: number

  @Column({ type: 'boolean', default: false })
  enabled: boolean

  @OneToOne(() => AdStat, (_) => _.ad)
  stat: Relation<AdStat>
}
