import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoundaryDto } from './dto/create-boundary.dto';
import { UpdateBoundaryDto } from './dto/update-boundary.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Boundary } from './entites/boundary.entity';
import { Trangualte } from './common/triangulate';
import { Tool } from './common/tool';

@Injectable()
export class threeService {
  constructor(
    @InjectRepository(Boundary) private readonly three: Repository<Boundary>
  ) {}

  create(createBoundaryDto: CreateBoundaryDto) {
    const boudary = new Boundary();
    boudary.name = createBoundaryDto.name;
    boudary.value = createBoundaryDto.value;
    createBoundaryDto.validate();
    this.three.save(boudary);
    return `This action adds a new boudary with name ${boudary.name}`;
  }

  async trangualte(name: string) {
    const obj = await this.findOne(name);
    if (obj.status === 200) {
      const boundaryData = obj.data[0].value;
      let trangualte = new Trangualte();
      trangualte.run(boundaryData.feature[0].geometry.coordinates[0]);
      const translateData = trangualte.All_Points;
      // console.log(translateData);
      const Data = [];
      let tool = new Tool();
      trangualte.run(boundaryData);
      const Boundary = []; //向内推进的边界数据
      const ptp = []; //每一个点的指向数据
      for (const boundary of translateData) {
        const Bdata = [];
        for (const point of boundary) {
          const pointXYZ = tool.getPointToVertexData(point);
          Bdata.push(pointXYZ.x, pointXYZ.y, pointXYZ.z);
          const ptpdata = [];
          let L_ptpXYZ = null;
          let R_ptpXYZ = null;
          if (point.L_PTP !== null) {
            L_ptpXYZ = tool.getPointToVertexData(point.L_PTP);
            ptpdata.push(L_ptpXYZ.x, L_ptpXYZ.y, L_ptpXYZ.z);
          }
          ptpdata.push(pointXYZ.x, pointXYZ.y, pointXYZ.z);
          if (point.R_PTP !== null) {
            R_ptpXYZ = tool.getPointToVertexData(point.R_PTP);
            ptpdata.push(R_ptpXYZ.x, R_ptpXYZ.y, R_ptpXYZ.z);
          }
          ptp.push(ptpdata);
        }
        Boundary.push(Bdata);
      }
      trangualte = null;
      tool = null;
      Data.push(Boundary, ptp);
      console.log(Data);
      return Data;
    }
  }

  async findAll() {
    const data = await this.three.find();
    const trangualte = new Trangualte();
    const tool = new Tool();
    if (data) {
      const boundaryData = data[0].value;
      // console.log(boundaryData.features[0].geometry.coordinates[0]);
      trangualte.run(boundaryData.features[0].geometry.coordinates[0]);
      const translateData = trangualte.All_Points;
      const Data = [];
      const Boundary = []; //向内推进的边界数据
      const ptp = []; //每一个点的指向数据
      const Extend = []; //extend点的数据
      for (const boundary of translateData) {
        const Bdata = [];
        for (const point of boundary) {
          const ptpdata = [];
          const extendData = [];
          let pointXYZ = null;
          let L_ptpXYZ = null;
          let E_ptpXYZ = null;
          let R_ptpXYZ = null;
          // if (point === null) console.log(point);
          pointXYZ = tool.getPointToVertexData(point);
          Bdata.push(pointXYZ.x, pointXYZ.y, pointXYZ.z);

          if (point.L_PTP !== null) {
            L_ptpXYZ = tool.getPointToVertexData(point.L_PTP);
            ptpdata.push(L_ptpXYZ.x, L_ptpXYZ.y, L_ptpXYZ.z);
          }
          ptpdata.push(pointXYZ.x, pointXYZ.y, pointXYZ.z);
          if (point.R_PTP !== null) {
            R_ptpXYZ = tool.getPointToVertexData(point.R_PTP);
            ptpdata.push(R_ptpXYZ.x, R_ptpXYZ.y, R_ptpXYZ.z);
          }
          if (point.extendPoint !== null) {
            E_ptpXYZ = tool.getPointToVertexData(point.extendPoint);
            extendData.push(E_ptpXYZ.x, E_ptpXYZ.y, E_ptpXYZ.z);
            extendData.push(pointXYZ.x, pointXYZ.y, pointXYZ.z);
            Extend.push(extendData);
          }
          if (ptpdata.length > 1) ptp.push(ptpdata);
        }
        Boundary.push(Bdata);
      }
      Data.push(Boundary, ptp, Extend);
      return {
        data: data,
        count: data.length,
        status: 200,
        // trangulate: translateData,
        trangulate: Data,
        message: 'Success!',
      };
    } else {
      return {
        status: 400,
        message: 'Failed',
      };
    }
  }

  async findOne(name: string) {
    const data = await this.three.find({
      where: { name: Like(`%${name}%`) },
    });
    const count = await this.three.count({
      where: { name: Like(`%${name}%`) },
    });

    if (data) {
      let trangualte = new Trangualte();
      const boundaryData = data[0].value;
      trangualte.run(boundaryData.feature[0].geometry.coordinates[0]);
      const translateData = trangualte.All_Points;
      // console.log(translateData);
      const Data = [];
      const tool = new Tool();
      trangualte.run(boundaryData);
      const Boundary = []; //向内推进的边界数据
      const ptp = []; //每一个点的指向数据
      for (const boundary of translateData) {
        const Bdata = [];
        for (const point of boundary) {
          const pointXYZ = tool.getPointToVertexData(point);
          Bdata.push(pointXYZ.x, pointXYZ.y, pointXYZ.z);
          if (point.L_PTP) {
            const ptpdata = [];
            const L_ptpXYZ = tool.getPointToVertexData(point.L_PTP);
            const R_ptpXYZ = tool.getPointToVertexData(point.R_PTP);
            ptpdata.push(
              L_ptpXYZ.x,
              L_ptpXYZ.y,
              L_ptpXYZ.z,
              pointXYZ.x,
              pointXYZ.y,
              pointXYZ.z,
              R_ptpXYZ.x,
              R_ptpXYZ.y,
              R_ptpXYZ.z
            );
            ptp.push(ptpdata);
          }
        }
        Boundary.push(Bdata);
      }
      Data.push(Boundary, ptp);
      console.log(Data);
      return {
        data: data,
        count: count,
        status: 200,
        trangulate: Data,
        message: 'Get target User',
      };
    } else {
      return {
        status: 400,
        message: 'Failed',
      };
    }
  }

  update(name: string, updateDto: UpdateBoundaryDto) {
    return this.three.update(name, updateDto);
  }

  async remove(name: string) {
    const boundary = await this.three.findOne({ where: { name } });
    if (boundary) {
      await this.three.remove(boundary);
      return 'success';
    } else {
      throw new NotFoundException(`Boundary with name ${name} does not exist.`);
    }
  }
}
