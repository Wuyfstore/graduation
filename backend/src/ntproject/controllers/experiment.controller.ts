import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BgsyService } from '../services/experiment.service';
import { CreateExperimentDto } from '../dto/experiment/create-experiment.dto';
import { UpdateExperimentDto } from '../dto/experiment/update-experiment.dto';

@Controller('experiment')
export class BgsyController {
  constructor(private readonly bgsyService: BgsyService) {}

  @Post()
  create(@Body() Dto: CreateExperimentDto) {
    return this.bgsyService.create(Dto);
  }

  @Get()
  findAll() {
    return this.bgsyService.findAll();
  }

  @Get('query')
  findTar(@Query('layerId') layerId: string, @Query('holeId') holeId: string) {
    const query = { layerId, holeId };
    return this.bgsyService.findTar(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bgsyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateExperimentDto) {
    return this.bgsyService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bgsyService.remove(id);
  }
}
