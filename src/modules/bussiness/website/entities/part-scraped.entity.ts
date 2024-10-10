import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation
} from 'typeorm'
import { Part } from './part.entity'
import { AbstractBaseEntity } from 'src/shared/entities/base.entity'

@Entity('part_scraped')
export class PartScraped extends AbstractBaseEntity {
  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'varchar', nullable: true })
  subtitle: string

  @Column({ type: 'varchar', nullable: true })
  thumbnailUrl: string

  @Column({ type: 'varchar', nullable: true })
  originUrl: string

  @Column({ type: 'json' })
  stats: Record<string, any>

  @ManyToOne(() => Part, (part) => part.scraped)
  part: Relation<Part>
}
