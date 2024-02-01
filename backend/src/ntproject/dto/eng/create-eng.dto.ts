import { RockFormation } from 'src/ntproject/entities/rockFormation.entity';

export class CreateEngDto {
  id: number;
  type: string;
  rock: RockFormation;
}
