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
import { AgeService } from '../services/age.service';
import { CreateAgeDto } from '../dto/age/create-age.dto';
import { UpdateAgeDto } from '../dto/age/update-age.dto';

@Controller('age')
export class AgeController {
  constructor(private readonly ageService: AgeService) {}

  @Post()
  create(@Body() createAgeDto: CreateAgeDto) {
    return this.ageService.create(createAgeDto);
  }

  @Get()
  findAll() {
    return this.ageService.findAll();
  }

  @Get('query')
  findTar(@Query('ageName') ageName: string) {
    return this.ageService.findTar(ageName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgeDto: UpdateAgeDto) {
    return this.ageService.update(+id, updateAgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ageService.remove(+id);
  }
}
