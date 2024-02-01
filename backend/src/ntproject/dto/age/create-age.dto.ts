import { RockFormation } from 'src/ntproject/entities/rockFormation.entity';
export class CreateAgeDto {
  id: number;
  ageName: string;
  rockFormation: RockFormation;
}
