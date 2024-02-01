import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ntproject } from './ntproject.entity';

//标贯实验 实体
@Entity()
export class BGSY {
  // 主键
  @PrimaryGeneratedColumn()
  id: number;

  //层号
  @Column()
  layerId: string;

  //孔号 这个要作为外键
  @Column()
  holeId: string;

  @ManyToOne(() => Ntproject, (hole) => hole.experiment)
  @JoinColumn({ name: 'holeId', referencedColumnName: 'OriginalHoleNumber' })
  project: Ntproject;

  //实验编号
  @Column()
  experimentNumber: string;

  //标贯深度
  @Column()
  depth:string

  //杆长
  @Column({ type: 'double', nullable: true })
  rodLength: number;

  //修正系数
  @Column({ type: 'double', nullable: true })
  correctionFactor: number;

  //实测击数
  @Column({ type: 'double', nullable: true })
  measureHits: number;

  //修正击数
  @Column({ type: 'double', nullable: true })
  fixedHits: number;

  //岩土名称 外键
  @Column()
  geoName: string;
}
