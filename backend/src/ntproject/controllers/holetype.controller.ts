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
import { HoletypeService } from '../services/holetype.service';
import { CreateHoleTypeDto } from '../dto/holetype/create-holetype.dto';
import { UpdateHoleTypeDto } from '../dto/holetype/update-holetype.dto';

@Controller('holetype')
export class HoletypeController {
  constructor(private readonly holetypeService: HoletypeService) {}

  @Post()
  create(@Body() createHoletypeDto: CreateHoleTypeDto) {
    return this.holetypeService.create(createHoletypeDto);
  }

  @Get()
  findAll() {
    return this.holetypeService.findAll();
  }

  @Get('query')
  findTar(@Query('type') type: string) {
    return this.holetypeService.findTar(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holetypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHoletypeDto: UpdateHoleTypeDto
  ) {
    return this.holetypeService.update(+id, updateHoletypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holetypeService.remove(+id);
  }
}
