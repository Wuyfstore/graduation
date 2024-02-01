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
import { EngService } from '../services/eng.service';
import { CreateEngDto } from '../dto/eng/create-eng.dto';
import { UpdateEngDto } from '../dto/eng/update-eng.dto';

@Controller('eng')
export class EngController {
  constructor(private readonly engService: EngService) {}

  @Post()
  create(@Body() createEngDto: CreateEngDto) {
    return this.engService.create(createEngDto);
  }

  @Get()
  findAll() {
    return this.engService.findAll();
  }

  @Get('query')
  findTar(@Query('type') type: string) {
    return this.engService.findTar(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.engService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEngDto: UpdateEngDto) {
    return this.engService.update(+id, updateEngDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.engService.remove(+id);
  }
}
