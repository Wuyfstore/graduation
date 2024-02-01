import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHisToGramDto } from '../dto/histogram/create-histogram.dto';
import { UpdateHisToGramDto } from '../dto/histogram/update-histogram.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Histogram } from '../entities/histogram.entity';

@Injectable()
export class HistogramService {
  constructor(
    @InjectRepository(Histogram)
    private readonly histogram: Repository<Histogram>
  ) {}

  create(createHistogramDto: CreateHisToGramDto) {
    let newHistogram = new Histogram();
    newHistogram = { ...createHistogramDto };
    this.histogram.save(newHistogram);
    return 'This action adds a new Histogram';
  }

  async findAll() {
    const data = await this.histogram.find();
    if (data) return { data: data, count: data.length, status: 200 };
    else return { data: data, count: 0, status: 400 };
  }

  async findTar(type: string) {
    const data = await this.histogram.find({
      where: { type: Like(`%${type}%`) },
    });
    const count = await this.histogram.count({
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
    const data = await this.histogram.findOne({
      where: { id },
    });
    return data;
  }

  async update(id: number, updateHistogramDto: UpdateHisToGramDto) {
    return this.histogram.update(id, updateHistogramDto);
  }

  async remove(id: number) {
    const data = await this.histogram.findOne({ where: { id } });
    if (data) {
      await this.histogram.remove(data);
      return 'Successfully';
    } else {
      throw new NotFoundException(
        `Histogram with data id ${id} does not exist.`
      );
    }
  }
}
