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
import { HistogramService } from '../services/histogram.service';
import { CreateHisToGramDto } from '../dto/histogram/create-histogram.dto';
import { UpdateHisToGramDto } from '../dto/histogram/update-histogram.dto';

@Controller('histogram')
export class HistogramController {
  constructor(private readonly histogramService: HistogramService) {}

  @Post()
  create(@Body() createHistogramDto: CreateHisToGramDto) {
    return this.histogramService.create(createHistogramDto);
  }

  @Get()
  findAll() {
    return this.histogramService.findAll();
  }

  @Get('query')
  findTar(@Query('type') type: string) {
    return this.histogramService.findTar(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.histogramService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistogramDto: UpdateHisToGramDto
  ) {
    return this.histogramService.update(+id, updateHistogramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.histogramService.remove(+id);
  }
}
