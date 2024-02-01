import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRockDto } from '../dto/rock/create-rock.dto';
import { UpdateRockDto } from '../dto/rock/update-rock.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RockFormation } from '../entities/rockFormation.entity';

type rockKeyWords = {
  name: string;
  ageOfGenesisType: string;
  engineeringGeoType: string;
  histogramType: string;
  projectName:string
};

@Injectable()
export class RockService {
  constructor(
    @InjectRepository(RockFormation)
    private readonly rock: Repository<RockFormation>
  ) {}

  create(createRockDto: CreateRockDto) {
    let newRock = new RockFormation();
    newRock = { ...createRockDto };
    this.rock.save(newRock);
    return 'This action adds a new RockFormation';
  }

  async findAll() {
    const data = await this.rock.find();
    if (data) return { data: data, count: data.length, status: 200 };
    else return { data: data, count: 0, status: 400 };
  }

  async findTar(keyword: rockKeyWords) {
    const selectedCondition = {
      where: {
        name: Like(`%${keyword.name}%`),
        ageOfGenesisType: Like(`%${keyword.ageOfGenesisType}%`),
        engineeringGeoType: Like(`%${keyword.engineeringGeoType}%`),
        histogramType: Like(`%${keyword.histogramType}%`),
        projectName: Like(`%${keyword.projectName}%`),
      },
    };
    const data = await this.rock.find(selectedCondition);
    const count = await this.rock.count(selectedCondition);
    if (data && count) {
      return {
        data: data,
        count: count,
        status: 200,
        message: 'Get seccessfully',
      };
    }
    return {
      data: data,
      count: count,
      status: 400,
      message: 'Get Failed',
    };
  }

  async findOne(id: number) {
    const data = await this.rock.findOne({
      where: { id },
    });
    return data;
  }

  async update(id: number, updateRockDto: UpdateRockDto) {
    return this.rock.update(id, updateRockDto);
  }

  async remove(id: number) {
    const data = await this.rock.findOne({ where: { id } });
    if (data) {
      await this.rock.remove(data);
      return 'Successfully';
    } else {
      throw new NotFoundException(`Rock with data id ${id} does not exist.`);
    }
  }
}
