import { Column, ManyToOne, OneToMany, Relation } from 'typeorm'
import { AbstractBaseEntity } from './base.entity'

/**
 * Base class for hierarchical entities, providing properties
 * and relationships for managing parent-child relationships.
 */
export abstract class BaseHierarchyEntity extends AbstractBaseEntity {
  @Column({ type: 'int', default: 1 })
  level: number // The level of the entity in the hierarchy

  @Column({ type: 'boolean', default: false })
  leaf: boolean // Indicates whether the entity is a leaf node (no children)

  @Column({ type: 'uuid', nullable: true })
  parentId: string | null // The ID of the parent entity, if applicable

  @ManyToOne(() => BaseHierarchyEntity, (entity) => entity.children, {
    nullable: true,
    onDelete: 'SET NULL' // Optional: define behavior on delete
  })
  parent: Relation<BaseHierarchyEntity | null> // Self-referential relationship to the parent entity

  @OneToMany(() => BaseHierarchyEntity, (entity) => entity.parent, {
    nullable: true,
    cascade: true // Optional: enables cascading operations
  })
  children: Relation<BaseHierarchyEntity[]> // Self-referential relationship to the child entities
}
