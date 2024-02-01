import { PartialType } from '@nestjs/mapped-types';
import { CreateHoleTypeDto } from './create-holetype.dto';

export class UpdateHoleTypeDto extends PartialType(CreateHoleTypeDto) {}
