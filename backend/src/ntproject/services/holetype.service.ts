import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHoleTypeDto } from '../dto/holetype/create-holetype.dto';
import { UpdateHoleTypeDto } from '../dto/holetype/update-holetype.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HoleType } from '../entities/holeType.entity';

@Injectable()
export class HoletypeService {
  constructor(
    @InjectRepository(HoleType)
    private readonly holeType: Repository<HoleType>
  ) {}

  create(createHoleTypeDto: CreateHoleTypeDto) {
    let newHoleType = new HoleType();
    newHoleType = { ...createHoleTypeDto };
    this.holeType.save(newHoleType);
    return 'This action adds a new HoleType';
  }

  async findAll() {
    const data = await this.holeType.find();
    if (data) return { data: data, count: data.length, status: 200 };
    else return { data: data, count: 0, status: 400 };
  }

  async findTar(type: string) {
    const data = await this.holeType.find({
      where: { type: Like(`%${type}%`) },
    });
    const count = await this.holeType.count({
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
    const data = await this.holeType.findOne({
      where: { id },
    });
    return data;
  }

  async update(id: number, updateHoleTypeDto: UpdateHoleTypeDto) {
    return this.holeType.update(id, updateHoleTypeDto);
  }

  async remove(id: number) {
    const data = await this.holeType.findOne({ where: { id } });
    if (data) {
      await this.holeType.remove(data);
      return 'Successfully';
    } else {
      throw new NotFoundException(
        `HoleType with data id ${id} does not exist.`
      );
    }
  }
}
