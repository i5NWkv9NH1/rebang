import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity } from 'typeorm'

export enum TrackerType {
  Click = 'Click',
  View = 'View'
}

@Entity('b_tracker')
export class Tracker extends AbstractBaseEntity {
  @Column({ type: 'json', nullable: true })
  data: object

  @Column({ type: 'enum', enum: TrackerType, default: TrackerType.Click })
  type: TrackerType

  @Column('timestamp')
  timestamp: Date
}
