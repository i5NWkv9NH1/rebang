import { AbstractBaseEntity } from 'src/common/entities/base.entity'
import { Entity } from 'typeorm'

@Entity('s_folder')
export class Folder extends AbstractBaseEntity {}
