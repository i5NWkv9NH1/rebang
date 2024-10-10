import { AbstractBaseEntity } from 'src/shared/entities/base.entity'
import { Column, Entity, ManyToOne, Relation } from 'typeorm'
import { Part } from './part.entity'
import { ZhihuAPI } from '../zhihu/zhihu.constant'
import { genUserAgent } from 'src/utils'
import { CronExpression } from '@nestjs/schedule'

@Entity('part_config')
export class PartConfig extends AbstractBaseEntity {
  @ManyToOne(() => Part, (part) => part.configs)
  part: Relation<Part>

  @Column({ type: 'boolean', default: false })
  enabled: boolean

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string

  @Column({ type: 'varchar', name: 'name' })
  name: string

  @Column({ type: 'varchar', name: 'job_name' })
  jobName: string

  @Column({
    type: 'varchar',
    name: 'pattern',
    default: CronExpression.EVERY_5_MINUTES
  })
  pattern: string

  @Column({
    type: 'boolean',
    name: 'immediately',
    default: false
  })
  immediately: boolean

  @Column({
    type: 'varchar',
    length: 255,
    name: 'url',
    nullable: false
  })
  url: string

  @Column({
    type: 'varchar',
    length: 255,
    name: 'user_agent',
    default: genUserAgent('desktop')
  })
  userAgent: string

  @Column({ type: 'text', name: 'cookie', nullable: true })
  cookie: string

  @Column({ type: 'json', name: 'headers', nullable: true })
  headers: Record<string, string>

  @Column({ type: 'int', name: 'timeout', default: 5000 })
  timeout: number

  @Column({ type: 'varchar', length: 255, name: 'proxy', nullable: true })
  proxy: string

  @Column({
    type: 'int',
    name: 'redis_expire',
    default: 3000
  })
  redisExpire: number

  @Column({
    type: 'varchar',
    name: 'redis_key',
    nullable: false
  })
  redisKey: string

  @Column({
    type: 'varchar',
    length: 255,
    name: 'cron_schedule',
    default: CronExpression.EVERY_5_MINUTES
  })
  cronSchedule: string
}
