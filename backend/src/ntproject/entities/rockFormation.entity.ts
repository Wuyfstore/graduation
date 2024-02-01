import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ntproject } from './ntproject.entity';
import { Age } from './ageOfGenesis.entity';
import { EngineeringGeo } from './engineeringGeo.entity';
import { Histogram } from './histogram.entity';

@Entity()
export class RockFormation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  formationId: number;

  @Column()
  name: string;

  @Column()
  numbering: string;

  //成因时代外键
  @Column()
  ageOfGenesisType: string;

  //成因时代
  @ManyToOne(() => Age, (age) => age.rockFormation)
  @JoinColumn({ name: 'ageOfGenesisType', referencedColumnName: 'ageName' })
  ageOfGenesis: Age;

  // 层底埋深
  @Column({ type: 'double' })
  buriedDeep: number;

  // 层底标高
  @Column({ type: 'double' })
  elevation: number;

  //地层厚度
  @Column({ type: 'double' })
  thickness: number;

  //工程地质层岩性外键
  @Column()
  engineeringGeoType: string;

  //工程地质层岩性名称
  @ManyToOne(() => EngineeringGeo, (geo) => geo.rock)
  @JoinColumn({ name: 'engineeringGeoType', referencedColumnName: 'type' })
  engineeringGeo: EngineeringGeo;

  // 柱状图地层岩性外键
  @Column()
  histogramType: string;

  // 柱状图地层岩性名称
  @ManyToOne(() => Histogram, (his) => his.rock)
  @JoinColumn({ name: 'histogramType', referencedColumnName: 'type' })
  histogram: Histogram;

  // 地层特征描述
  @Column()
  characterization: string;

  // Ntproject 外键
  @Column()
  projectName: string;

  @ManyToOne(() => Ntproject, (project) => project.items)
  @JoinColumn({
    name: 'projectName',
    referencedColumnName: 'OriginalHoleNumber',
  })
  project: Ntproject;
}
