import { HoleType } from '../../entities/holeType.entity';
import { RockFormation } from '../../entities/rockFormation.entity';
import { BGSY } from '../../entities/experimentalStatistics.entity';
export class CreateNtprojectDto {
  id: number;
  label: string;
  OriginalHoleNumber: string | null;
  jobNumber: string | null;
  jobName: string | null;
  holetype: string;
  holeType: HoleType;
  lon: number;
  lat: number;
  MmGirdCoordX: number | null;
  MmGirdCoordY: number | null;
  groundElevation: number | null;
  drillingDepth: number | null;
  initWaterLevel: number | null;
  FixedLevel: number | null;
  ConstructionOrginization: string | null;
  CommencementDate: string;
  items: RockFormation[];
  experiment: BGSY;
}
