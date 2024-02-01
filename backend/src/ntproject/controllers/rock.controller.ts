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
import { RockService } from '../services/rock.service';
import { CreateRockDto } from '../dto/rock/create-rock.dto';
import { UpdateRockDto } from '../dto/rock/update-rock.dto';

@Controller('rock')
export class RockController {
  constructor(private readonly rockService: RockService) {}

  @Post()
  create(@Body() createRockDto: CreateRockDto) {
    return this.rockService.create(createRockDto);
  }

  @Get()
  findAll() {
    return this.rockService.findAll();
  }

  @Get('query')
  findTar(
    @Query('name') name: string,
    @Query('ageOfGenesisType') ageOfGenesisType: string,
    @Query('engineeringGeoType') engineeringGeoType: string,
    @Query('histogramType') histogramType: string,
    @Query('projectName') projectName: string
  ) {
    const query = {
      name,
      ageOfGenesisType,
      engineeringGeoType,
      histogramType,
      projectName
    };
    return this.rockService.findTar(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRockDto: UpdateRockDto) {
    return this.rockService.update(+id, updateRockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rockService.remove(+id);
  }
}
