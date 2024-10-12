import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Entity } from 'typeorm'

@Entity('s_file')
export class File extends AbstractBaseEntity {}
