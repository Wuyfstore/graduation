import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperimentDto } from '../dto/experiment/create-experiment.dto';
import { UpdateExperimentDto } from '../dto/experiment/update-experiment.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BGSY } from '../entities/experimentalStatistics.entity';

type experimentKeys = {
  layerId: string;
  holeId: string;
};

@Injectable()
export class BgsyService {
  constructor(@InjectRepository(BGSY) private readonly SY: Repository<BGSY>) {}

  create(dto: CreateExperimentDto) {
    let newSy = new BGSY();
    newSy = { ...dto };
    this.SY.save(newSy);
    return 'This action adds a new BGSY';
  }

  async findAll() {
    const data = await this.SY.find();
    if (data) return { data: data, count: data.length, status: 200 };
    else return { data: data, count: 0, status: 400 };
  }

  async findTar(keywords: experimentKeys) {
    const selectedCondition = {
      where: { holeId: Like(`%${keywords.holeId}%`),layerId:Like(`%${keywords.layerId}%`) },
    }
    const data = await this.SY.find(selectedCondition);
    const count = await this.SY.count(selectedCondition);
    if (data.length > 0)
      return {
        data: data,
        count: count,
        status: 200,
        message: 'Get target BGSY',
      };
    else return { data: data, count: count, status: 400, message: 'Failed' };
  }

  async findOne(id: number) {
    const data = await this.SY.findOne({ where: { id } });
    return data;
  }

  async update(id: number, dto: UpdateExperimentDto) {
    return this.SY.update(id, dto);
  }

  async remove(id: number) {
    const data = await this.SY.findOne({ where: { id } });
    if (data) {
      await this.SY.remove(data);
      return 'Successfully';
    } else {
      throw new NotFoundException(`BGSY with data id ${id} does not exist.`);
    }
  }
}
