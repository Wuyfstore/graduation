import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { RockFormation } from './rockFormation.entity';
@Entity()
export class Age {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true }) // 添加唯一约束到ageName字段
  ageName: string;

  @OneToMany(() => RockFormation, (rock) => rock.ageOfGenesis)
  rockFormation: RockFormation;
}
