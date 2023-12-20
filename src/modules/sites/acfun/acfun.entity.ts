import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { AcFunItem } from './acfun.type'
import { ACFUN_RANK_TYPE } from './acfun.constant'
import { BaseSiteEntity } from 'src/shared/base-site.entity'

// @Entity('acfun')
export class AcFunEntity extends BaseSiteEntity {}
