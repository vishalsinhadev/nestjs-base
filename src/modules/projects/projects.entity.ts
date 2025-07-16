import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from '../tasks/tasks.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  state_id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => Task, task => task.project, { cascade: true })
  tasks: Task[];
}
