import { PartialType } from '@nestjs/mapped-types';
import { CreateRockDto } from './create-rock.dto';

export class UpdateRockDto extends PartialType(CreateRockDto) {}
