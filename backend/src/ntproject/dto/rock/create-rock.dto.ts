import { Ntproject } from 'src/ntproject/entities/ntproject.entity';
import { Age } from 'src/ntproject/entities/ageOfGenesis.entity';
import { EngineeringGeo } from 'src/ntproject/entities/engineeringGeo.entity';
import { Histogram } from 'src/ntproject/entities/histogram.entity';

export class CreateRockDto {
  id: number;
  formationId: number;
  name: string;
  numbering: string;
  ageOfGenesisType: string;
  ageOfGenesis: Age;
  buriedDeep: number;
  elevation: number;
  thickness: number;
  engineeringGeoType: string;
  engineeringGeo: EngineeringGeo;
  histogramType: string;
  histogram: Histogram;
  characterization: string;
  projectName: string;
  project: Ntproject;
}
