import { PartialType } from '@nestjs/mapped-types';
import { CreateNtprojectDto } from './create-ntproject.dto';

export class UpdateNtprojectDto extends PartialType(CreateNtprojectDto) {}
