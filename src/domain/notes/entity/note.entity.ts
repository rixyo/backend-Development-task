import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notes')
export class NoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255 })
  public title!: string;

  @Column({ type: 'varchar', default: null })
  public content!: string;

  @CreateDateColumn({
    type: 'timestamp',
    select: true,
  })
  public created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    select: true,
  })
  public updated_at!: Date;
}
