import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('acfun')
export class AcFunEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string
}
