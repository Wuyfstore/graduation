import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEngDto } from '../dto/eng/create-eng.dto';
import { UpdateEngDto } from '../dto/eng/update-eng.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EngineeringGeo } from '../entities/engineeringGeo.entity';

@Injectable()
export class EngService {
  constructor(
    @InjectRepository(EngineeringGeo)
    private readonly Eng: Repository<EngineeringGeo>
  ) {}

  create(createEngDto: CreateEngDto) {
    let newEng = new EngineeringGeo();
    newEng = { ...createEngDto };
    this.Eng.save(newEng);
    return 'This action adds a new Eng';
  }

  async findAll() {
    const data = await this.Eng.find();
    if (data) return { data: data, count: data.length, status: 200 };
    else return { data: data, count: 0, status: 400 };
  }

  async findTar(type: string) {
    const data = await this.Eng.find({
      where: { type: Like(`%${type}%`) },
    });
    const count = await this.Eng.count({
      where: { type: Like(`%${type}%`) },
    });
    if (data && count)
      return {
        data: data,
        count: count,
        status: 200,
        message: 'Get target Age',
      };
    else return { data: data, count: count, status: 400, message: 'Failed' };
  }

  async findOne(id: number) {
    const data = await this.Eng.findOne({
      where: { id },
    });
    return data;
  }

  async update(id: number, updateEngDto: UpdateEngDto) {
    return this.Eng.update(id, updateEngDto);
  }

  async remove(id: number) {
    const data = await this.Eng.findOne({ where: { id } });
    if (data) {
      await this.Eng.remove(data);
      return 'Successfully';
    } else {
      throw new NotFoundException(`Eng with data id ${id} does not exist.`);
    }
  }
}
