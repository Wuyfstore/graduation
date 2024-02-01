import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { RockFormation } from './rockFormation.entity';

@Entity()
export class EngineeringGeo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true }) // 添加唯一约束
  type: string;

  @OneToMany(() => RockFormation, (rock) => rock.engineeringGeo)
  rock: RockFormation;
}
