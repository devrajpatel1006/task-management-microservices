import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: null })
  title: string;

  @Column({ type: 'varchar', default: null})
  description: string;

  @Column({ type: 'int', default: 0 })
  user_id: string;

  @Column({ type: 'tinyint', default: 0, comment: '0= Low, 1= Medium, 2=High' })
  priority: number;

  @Column({ type: 'tinyint', default: 1, comment: '1= Active, 0= Inactive' })
  status: number;

  @Column({ type: 'tinyint', default: 0, comment: '0= Active, 1= Deleted' })
  is_deleted: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  due_date: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'The timestamp when the user was created',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'The timestamp when the user was last updated',
  })
  updated_at: Date;
}
