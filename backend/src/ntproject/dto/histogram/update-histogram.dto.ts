import { PartialType } from '@nestjs/mapped-types';
import { CreateHisToGramDto } from './create-histogram.dto';

export class UpdateHisToGramDto extends PartialType(CreateHisToGramDto) {}
