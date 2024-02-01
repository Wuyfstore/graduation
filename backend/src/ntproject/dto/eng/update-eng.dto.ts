import { PartialType } from '@nestjs/mapped-types';
import { CreateEngDto } from './create-eng.dto';

export class UpdateEngDto extends PartialType(CreateEngDto) {}
