import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: null })
  username: string;

  @Column({ type: 'varchar', default: null, unique: true })
  email: string;

  @Column({ type: 'varchar', default: null })
  password: string;

  @Column({ type: 'tinyint', default: 1, comment: '1= Default, 0= Admin' })
  type: number;

  @Column({ type: 'tinyint', default: 1, comment: '1= Active, 0= Inactive' })
  status: number;

  @Column({ type: 'tinyint', default: 0, comment: '0= Active, 1= Deleted' })
  is_deleted: number;

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
