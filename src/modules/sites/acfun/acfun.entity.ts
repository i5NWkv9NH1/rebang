import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { AcFunItem } from './acfun.type'
import { ACFUN_RANK_TYPE } from './acfun.constant'
import { SiteAbstractEntity } from '../site.abstract.entity'

@Entity('acfun')
export class AcFunEntity extends SiteAbstractEntity {
  @Column('jsonb', { nullable: true, default: [] })
  public data: AcFunItem[]

  @Column({ type: 'enum', enum: ACFUN_RANK_TYPE, default: ACFUN_RANK_TYPE.DAY })
  public type: ACFUN_RANK_TYPE
}
