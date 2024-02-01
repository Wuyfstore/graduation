import {
  Entity,
  Index,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { RockFormation } from './rockFormation.entity';

@Entity()
export class Histogram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true }) // 添加唯一约束
  type: string;

  // @Column({ type: 'longblob', nullable: true }) // 设置img字段为Blob类型
  @Column({ nullable: true })
  // img: Buffer; // 添加img字段用于存储图片
  img: string;

  @OneToMany(() => RockFormation, (rock) => rock.histogram)
  rock: RockFormation;
}
