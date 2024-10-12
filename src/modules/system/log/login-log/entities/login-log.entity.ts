import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Entity } from 'typeorm'

@Entity('s_login_log')
export class LoginLog extends AbstractBaseEntity {}
