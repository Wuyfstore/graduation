import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { threeService } from './three.service';
import { CreateBoundaryDto } from './dto/create-boundary.dto';
import { UpdateBoundaryDto } from './dto/update-boundary.dto';

@Controller('three')
export class threeController {
  constructor(private readonly threeService: threeService) {}

  @Post()
  create(@Body() createDto: CreateBoundaryDto) {
    return this.threeService.create(createDto);
  }

  @Get()
  findAll() {
    return this.threeService.findAll();
  }

  @Get('query')
  findTar(@Query('name') name: string) {
    return this.threeService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateDto: UpdateBoundaryDto) {
    return this.threeService.update(name, updateDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.threeService.remove(name);
  }
}
