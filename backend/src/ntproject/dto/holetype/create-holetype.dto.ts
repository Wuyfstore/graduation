import { Ntproject } from 'src/ntproject/entities/ntproject.entity';
export class CreateHoleTypeDto {
  id: number;
  type: string;
  ntproject: Ntproject;
}
