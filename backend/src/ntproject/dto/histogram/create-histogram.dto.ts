import { RockFormation } from 'src/ntproject/entities/rockFormation.entity';
import { BGSY } from 'src/ntproject/entities/experimentalStatistics.entity';

export class CreateHisToGramDto {
  id: number;
  type: string;
  // img: Buffer;
  img: string;
  rock: RockFormation;
}
