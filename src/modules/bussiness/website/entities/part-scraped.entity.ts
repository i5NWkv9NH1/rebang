import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation
} from 'typeorm'
import { Part } from './part.entity'
import { AbstractBaseEntity } from 'src/common/entities/base.entity'

@Entity('b_part_scraped')
export class PartScraped extends AbstractBaseEntity {
  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'varchar', nullable: true })
  subtitle: string

  @Column({ type: 'varchar', nullable: true })
  thumbnailUrl: string

  @Column({ type: 'varchar', nullable: true })
  originUrl: string

  @Column({ type: 'json', nullable: true })
  stats: Record<string, any>

  @Column({ type: 'json', nullable: true })
  extra: Record<string, any>

  @Column({ type: 'varchar', nullable: true })
  time: string

  @ManyToOne(() => Part, (part) => part.scraped)
  part: Relation<Part>
}
