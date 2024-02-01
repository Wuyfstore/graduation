import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgeDto } from '../dto/age/create-age.dto';
import { UpdateAgeDto } from '../dto/age/update-age.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Age } from '../entities/ageOfGenesis.entity';

@Injectable()
export class AgeService {
  constructor(@InjectRepository(Age) private readonly Age: Repository<Age>) {}

  create(createAgeDto: CreateAgeDto) {
    let newAge = new Age();
    newAge = { ...createAgeDto };
    this.Age.save(newAge);
    return 'This action adds a new Age';
  }

  async findAll() {
    const data = await this.Age.find();
    if (data) return { data: data, count: data.length, status: 200 };
    else return { data: data, count: 0, status: 400 };
  }

  async findTar(ageName: string) {
    const data = await this.Age.find({
      where: { ageName: Like(`%${ageName}%`) },
    });
    const count = await this.Age.count({
      where: { ageName: Like(`%${ageName}%`) },
    });
    if (data.length > 0)
      return {
        data: data,
        count: count,
        status: 200,
        message: 'Get target Age',
      };
    else return { data: data, count: count, status: 400, message: 'Failed' };
  }

  async findOne(id: number) {
    const data = await this.Age.findOne({
      where: { id },
    });
    return data;
  }

  async update(id: number, updateAgeDto: UpdateAgeDto) {
    return this.Age.update(id, updateAgeDto);
  }

  async remove(id: number) {
    const data = await this.Age.findOne({ where: { id } });
    if (data) {
      await this.Age.remove(data);
      return 'Successfully';
    } else {
      throw new NotFoundException(`Age with data id ${id} does not exist.`);
    }
  }
}
