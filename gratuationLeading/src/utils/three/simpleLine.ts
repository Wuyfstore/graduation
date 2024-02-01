import { Tool } from './tool.js'
import { Point } from './point.js'

export class simpleLine {
  currentPoint: Point
  nextPoint: Point
  tool: Tool
  constructor(currentPoint: Point, nextPoint: Point) {
    this.currentPoint = currentPoint
    this.nextPoint = nextPoint
    this.tool = new Tool()
  }

  //基于某种规则 返回一个推进点
  CreatePropulsionPoint(boundaryData: Point[]) {
    // console.log(this.currentPoint);
    // console.log(this.nextPoint);
    if (!this.currentPoint || !this.nextPoint) return
    const { vector, length } = this.tool.measureLength(this.currentPoint, this.nextPoint)
    const unit = { x: vector.x / length, y: vector.y / length }
    //设定夹角等于60°
    const angleOffset = 60
    const angleRad = (angleOffset * Math.PI) / 180 // 将角度转换为弧度
    const x1 =
      this.currentPoint.x +
      length * Math.cos(angleRad) * unit.x -
      length * Math.sin(angleRad) * unit.y
    const x2 =
      this.currentPoint.x +
      length * Math.cos(angleRad) * unit.x +
      length * Math.sin(angleRad) * unit.y
    const y1 =
      this.currentPoint.y +
      length * Math.sin(angleRad) * unit.x +
      length * Math.cos(angleRad) * unit.y
    const y2 =
      this.currentPoint.y -
      length * Math.sin(angleRad) * unit.x +
      length * Math.cos(angleRad) * unit.y
    const p1 = new Point()
    p1.setXY(x1, y1)
    const p2 = new Point()
    p2.setXY(x2, y2)
    if (Number.isNaN(p1.x)) return false
    const isInPolygon1 = this.tool.isPointInPolygon(boundaryData, p1)
    if (Number.isNaN(p2.x)) return false
    const isInPolygon2 = this.tool.isPointInPolygon(boundaryData, p2)
    if (isInPolygon1) return p1
    else if (isInPolygon2) return p2
    else return false
  }
}
