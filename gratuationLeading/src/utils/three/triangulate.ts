import { Point } from './point'
import { PointChild } from './pointChild'
import { simpleLine } from './simpleLine'
import { Tool } from './tool'

let i = 1 //标记运行了几次

export class Trangualte {
  boundary: Array<Point>
  DiscreteBoundary: Array<Point>
  newBoundray: Array<any>
  All_Points: Array<Point[]>
  P_To_P_D: Array<any>
  Discrete_Standards: number
  tempTPoint: Point | false
  tool: Tool
  constructor() {
    this.boundary = [] //存储转换后的边界数据 和 未离散的点
    this.DiscreteBoundary = [] //存储离散后的点集
    this.newBoundray = [] //存储推进点
    this.All_Points = [] //存储三角网里的所有点
    this.P_To_P_D = [] //用于存储两点之间的距离
    this.Discrete_Standards = 200 //离散标准
    this.tempTPoint = false //存储临时推进点
    this.tool = new Tool()
  }

  //对边界数据进行处理
  processData(boundaryData: Array<[number, number]> | Point[]) {
    if (boundaryData[0] instanceof Point) {
      this.setPointNeighborPoints(boundaryData as Point[])
    } else {
      // console.log(typeof boundaryData[0]);
      for (const point of boundaryData) {
        const P = new Point()
        P.setLonLat(point[0], point[1])
        this.boundary.push(P)
      }
      this.setPointNeighborPoints(this.boundary)
    }
  }

  //给出点的相邻两点
  setPointNeighborPoints(data: Point[]) {
    const firstPoint = data[0]
    const fNextPoint = data[1]
    const fLastPoint = data[data.length - 2]
    firstPoint.nextPoint = new PointChild(fNextPoint)
    firstPoint.lastPoint = new PointChild(fLastPoint)
    const angle = this.tool.measureAngle2(firstPoint, fLastPoint, fNextPoint)
    this.pushForward(angle, firstPoint, fLastPoint)
    for (let i = 1; i < data.length - 1; i++) {
      const current = data[i]
      const last = data[i - 1]
      const next = data[i + 1]
      current.nextPoint = new PointChild(next)
      current.lastPoint = new PointChild(last)
      const angle = this.tool.measureAngle2(current, last, next)
      this.pushForward(angle, current, last)
    }
    data.pop()
    data.push(firstPoint)
  }

  //以范围里面的最短距离作为 离散标准
  setDiscreteStandards() {
    this.Discrete_Standards = this.tool.measureMinDistance(this.boundary)
    console.log('设置离散标准')
  }

  //离散计算 返回离散结果
  discreteComputing() {
    this.DiscreteBoundary = this.tool.discrete(this.boundary, this.Discrete_Standards)
    this.All_Points.push(this.DiscreteBoundary)
    // console.log(this.DiscreteBoundary.length);
    console.log('进行离散计算')
  }

  //对是否可以推进进行标记、
  pushForward(angle: number, current: Point, last: Point) {
    if (angle >= 120) {
      current.isPushForward = '1'
      last.isPushForward = '1'
    } else if (angle < 120 && angle > 60) {
      current.isPushForward = '1'
      last.isPushForward = '0'
    } else {
      current.isPushForward = '0'
      last.isPushForward = '0'
    }
  }

  //向内推进时创建新点的规则  这里需要改
  CreatePropulsionPoint() {
    this.boundary = []
    // console.log(this.DiscreteBoundary.length);
    const l = this.DiscreteBoundary.length
    if (this.DiscreteBoundary[l - 2].x === this.DiscreteBoundary[l - 1].x) {
      this.DiscreteBoundary.slice(l - 2, 1)
    }
    for (let i = 0; i < this.DiscreteBoundary.length; i++) {
      const currentPoint = this.DiscreteBoundary[i]
      if (currentPoint.isPushForward === '0') continue
      const nextPoint = this.DiscreteBoundary[i + 1]
      if (nextPoint) {
        if (this.tempTPoint) {
          const p = new PointChild(this.tempTPoint)
          currentPoint.setLPTP(p)
        }
        const Line = new simpleLine(currentPoint, nextPoint)
        this.tempTPoint = Line.CreatePropulsionPoint(this.DiscreteBoundary)
        if (this.tempTPoint) {
          const p = new PointChild(this.tempTPoint)
          currentPoint.setRPTP(p)
          nextPoint.setLPTP(p)
          this.boundary.push(this.tempTPoint)
        } else {
          continue
        }
      }
    }
    //保证闭合
    this.boundary.push(this.boundary[0])
    console.log('创建推进点')
  }

  //停止向内推进的计算
  stop() {
    let i = 0
    const allLength = []
    for (let i = 0; i < this.boundary.length; i++) {
      const currentPoint = this.boundary[i]
      const nextPoint = this.boundary[i + 1]
      if (nextPoint) {
        const { length } = this.tool.measureLength(currentPoint, nextPoint)
        allLength.push(length)
      }
    }
    for (const length of allLength) {
      if (length <= this.Discrete_Standards) {
        i = i + 1
      }
    }
    const stop_F = i / allLength.length
    return stop_F
  }

  //调用
  run(boundaryData) {
    this.processData(boundaryData) //首次处理数据成[Point,Point,...]
    // this.setDiscreteStandards(); //设置离散标准
    if (this.stop() < 0.8) {
      //设置停止
      // console.log(this.boundary);
      this.discreteComputing() //离散
      this.CreatePropulsionPoint() //向内推进，并标注左右点
      i = i + 1
      console.log(i)
      this.run(this.boundary) //递归调用
    }
  }
}
