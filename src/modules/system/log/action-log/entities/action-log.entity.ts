import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Entity } from 'typeorm'

@Entity('s_action_log')
export class ActionLog extends AbstractBaseEntity {}
