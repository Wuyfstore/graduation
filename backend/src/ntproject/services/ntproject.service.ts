import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNtprojectDto } from '../dto/ntproject/create-ntproject.dto';
import { UpdateNtprojectDto } from '../dto/ntproject/update-ntproject.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ntproject } from '../entities/ntproject.entity';

type ntprojectFindKeyWords = {
  label: string;
  OriginalHoleNumber: string;
  jobNumber: string;
  jobName: string;
};

@Injectable()
export class NtprojectService {
  constructor(
    @InjectRepository(Ntproject) private readonly Nt: Repository<Ntproject>
  ) {}
  create(createNtprojectDto: CreateNtprojectDto) {
    let newProject = new Ntproject();
    newProject = { ...createNtprojectDto };
    this.Nt.save(newProject);
    return 'This action adds a new ntproject';
  }

  async findAll() {
    const data = await this.Nt.find({ relations: ['items'] });
    if (data) return { data: data, count: data.length, status: 200 };
    else return { data: data, count: 0, status: 400 };
  }

  async findTar(keyword: ntprojectFindKeyWords) {
    const selectedCondition = {
      where: {
        label: Like(`%${keyword.label}%`),
        OriginalHoleNumber: Like(`%${keyword.OriginalHoleNumber}%`),
        jobName: Like(`%${keyword.jobName}%`),
        jobNumber: Like(`%${keyword.jobNumber}%`),
      },
    };
    const datas = await this.Nt.find(selectedCondition);
    const count = await this.Nt.count(selectedCondition);
    if (datas) {
      return {
        data: datas,
        count: count,
        status: 200,
        message: 'Get seccessfully',
      };
    }
    return {
      data: datas,
      count: count,
      status: 400,
      message: 'Get Failed',
    };
  }

  // 用于前端点击实体 获得相应的数据
  async findOne(id: number): Promise<Ntproject | undefined> {
    const data = await this.Nt.findOne({
      where: { id: id },
      relations: ['items'],
    });
    return data;
  }

  async update(id: number, updateNtprojectDto: UpdateNtprojectDto) {
    return this.Nt.update(id, updateNtprojectDto);
  }

  async remove(id: number) {
    const entity = await this.Nt.findOne({ where: { id } });
    if (entity) {
      await this.Nt.remove(entity);
      return `Nt with entity id ${id} has been removed successfully!`;
    } else {
      throw new NotFoundException(`Nt with entity id ${id} does not exist.`);
    }
  }
}
