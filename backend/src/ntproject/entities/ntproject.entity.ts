// 南通项目实体
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { HoleType } from './holeType.entity';
import { BGSY } from './experimentalStatistics.entity';
import { RockFormation } from './rockFormation.entity';

@Entity()
export class Ntproject {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  label: string;

  @Column()
  @Index()
  OriginalHoleNumber: string;

  @Column({ nullable: true })
  jobNumber: string | null;

  @Column({ nullable: true })
  jobName: string | null;

  @Column()
  holetype: string;

  @ManyToOne(() => HoleType, (Type) => Type.ntproject)
  @JoinColumn({ name: 'holetype', referencedColumnName: 'type' })
  holeType: HoleType;

  @Column({ type: 'double' })
  lon: number;

  @Column({ type: 'double' })
  lat: number;

  // nullable可以为空
  @Column({ type: 'double', nullable: true })
  MmGirdCoordX: number | null;

  @Column({ type: 'double', nullable: true })
  MmGirdCoordY: number | null;

  @Column({ type: 'double', nullable: true })
  groundElevation: number | null;

  @Column({ type: 'double', nullable: true })
  drillingDepth: number | null;

  @Column({ type: 'double', nullable: true })
  initWaterLevel: number | null;

  @Column({ type: 'double', nullable: true })
  FixedLevel: number | null;

  @Column({ nullable: true })
  ConstructionOrginization: string | null;

  // @Column({ type: 'date' })
  @Column({ nullable: true })
  CommencementDate: string;

  @OneToMany(() => RockFormation, (Item) => Item.project)
  items: RockFormation[];

  @OneToMany(() => BGSY, (exp) => exp.project)
  experiment: BGSY;
}
