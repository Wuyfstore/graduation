import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Ntproject } from './ntproject.entity';

@Entity()
export class HoleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true }) // 添加唯一约束
  type: string;

  @OneToMany(() => Ntproject, (ntproject) => ntproject.holeType)
  ntproject: Ntproject;
}
