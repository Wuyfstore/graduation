import { Histogram } from 'src/ntproject/entities/histogram.entity';
import { Ntproject } from 'src/ntproject/entities/ntproject.entity';

export class CreateExperimentDto {
  id: number;
  layerId: string;
  holeId: string;
  project: Ntproject;
  depth:string
  experimentNumber: string;
  rodLength: number;
  correctionFactor: number;
  measureHits: number;
  fixedHits: number;
  geoName: string;
}
