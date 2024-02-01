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
import { NtprojectService } from '../services/ntproject.service';
import { CreateNtprojectDto } from '../dto/ntproject/create-ntproject.dto';
import { UpdateNtprojectDto } from '../dto/ntproject/update-ntproject.dto';

@Controller('ntproject')
export class NtprojectController {
  constructor(private readonly ntprojectService: NtprojectService) {}

  @Post()
  create(@Body() createNtprojectDto: CreateNtprojectDto) {
    return this.ntprojectService.create(createNtprojectDto);
  }

  @Get()
  findAll() {
    return this.ntprojectService.findAll();
  }

  @Get('query')
  findTar(
    @Query('label') label: string,
    @Query('OriginalHoleNumber') OriginalHoleNumber: string,
    @Query('jobName') jobName: string,
    @Query('jobNumber') jobNumber: string
  ) {
    const query = {
      label,
      OriginalHoleNumber,
      jobName,
      jobNumber,
    };
    return this.ntprojectService.findTar(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ntprojectService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNtprojectDto: UpdateNtprojectDto
  ) {
    return this.ntprojectService.update(+id, updateNtprojectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ntprojectService.remove(+id);
  }
}
