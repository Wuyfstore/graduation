//注册boundary实体
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Boundary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'json' })
  value: any;
}

