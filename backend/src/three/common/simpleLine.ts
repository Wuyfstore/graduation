import { Tool } from './tool.js';
import { Point } from './point.js';

export class simpleLine {
  currentPoint: Point;
  nextPoint: Point;
  tool: Tool;
  constructor(currentPoint: Point, nextPoint: Point) {
    this.currentPoint = currentPoint;
    this.nextPoint = nextPoint;
    this.tool = new Tool();
  }

  //基于某种规则 返回一个推进点
  CreatePropulsionPoint(boundaryData: Point[]) {
    if (!this.currentPoint || !this.nextPoint) return;
    const { vector, length } = this.tool.measureLength(
      this.currentPoint,
      this.nextPoint
    );
    const unit = { x: vector.x / length, y: vector.y / length };
    //设定夹角等于60°
    const angleOffset = 60;
    const angleRad = (angleOffset * Math.PI) / 180; // 将角度转换为弧度
    const x1 =
      this.currentPoint.x +
      length * Math.cos(angleRad) * unit.x -
      length * Math.sin(angleRad) * unit.y;
    const x2 =
      this.currentPoint.x +
      length * Math.cos(angleRad) * unit.x +
      length * Math.sin(angleRad) * unit.y;
    const y1 =
      this.currentPoint.y +
      length * Math.sin(angleRad) * unit.x +
      length * Math.cos(angleRad) * unit.y;
    const y2 =
      this.currentPoint.y -
      length * Math.sin(angleRad) * unit.x +
      length * Math.cos(angleRad) * unit.y;
    const p1 = new Point();
    p1.setXY(x1, y1);
    const p2 = new Point();
    p2.setXY(x2, y2);
    if (Number.isNaN(p1.x)) return false;
    const isInPolygon1 = this.tool.isPointInPolygon(boundaryData, p1);
    if (Number.isNaN(p2.x)) return false;
    const isInPolygon2 = this.tool.isPointInPolygon(boundaryData, p2);
    if (isInPolygon1) return p1;
    else if (isInPolygon2) return p2;
    else return false;
  }

  //设置推进点位的方法
  setPropulsionPoint(boundaryData: Point[], forwordVal: number) {
    const mx = (this.currentPoint.x + this.nextPoint.x) / 2;
    const my = (this.currentPoint.y + this.nextPoint.y) / 2;
    const middlePoint = { x: mx, y: my };
    const { length } = this.tool.measureLength(
      this.currentPoint,
      this.nextPoint
    );

    const k = (1.732 * 0.5 * forwordVal) / length;
    const f0 = (3 * k) / 2.25;
    const f1 = (2 * f0 * f0 * f0 + 3 * k) / (3 * f0 * f0 + 2.25);
    const h = f1 * length;

    //计算推进点坐标
    const p1 = {
      x:
        middlePoint.x + (h * (this.nextPoint.y - this.currentPoint.y)) / length,
      y:
        middlePoint.y - (h * (this.nextPoint.x - this.currentPoint.x)) / length,
    };

    const p2 = {
      x:
        middlePoint.x - (h * (this.nextPoint.y - this.currentPoint.y)) / length,
      y:
        middlePoint.y + (h * (this.nextPoint.x - this.currentPoint.x)) / length,
    };

    const P1 = new Point();
    P1.setXY(p1.x, p1.y);
    const P2 = new Point();
    P2.setXY(p2.x, p2.y);

    if (Number.isNaN(P1.x)) {
      const isInPolygon2 = this.tool.isPointInPolygon(boundaryData, P2);
      if (isInPolygon2) return P2;
    } else if (Number.isNaN(P2.x)) {
      const isInPolygon1 = this.tool.isPointInPolygon(boundaryData, P1);
      if (isInPolygon1) return P1;
    } else return false;
  }

  //实现推进点 已知AB点 C点在AB点的垂直平分线上 角CAB默认是60°
  implementPropulsionPoint(
    boundaryData: Point[],
    d: number
  ): Point | Point[] | false {
    const extendPoint = this.handleLargeAngle(boundaryData, d);

    const midPoint = {
      x: (this.currentPoint.x + this.nextPoint.x) / 2,
      y: (this.currentPoint.y + this.nextPoint.y) / 2,
    };

    const { length } = this.tool.measureLength(
      this.currentPoint,
      this.nextPoint
    );

    //垂直向量
    const unitVertorU = {
      x: -(this.nextPoint.y - this.currentPoint.y) / length,
      y: (this.nextPoint.x - this.currentPoint.x) / length,
    };

    //计算推进点位
    const defaultAngle = 60; //默认角度
    const translateAngle = (defaultAngle * Math.PI) / 180; //度数转换为弧度

    const p1 = {
      x: midPoint.x + (length / 2) * Math.cos(translateAngle) * unitVertorU.x,
      y: midPoint.y + (length / 2) * Math.cos(translateAngle) * unitVertorU.y,
    };

    const p2 = {
      x: midPoint.x - (length / 2) * Math.cos(translateAngle) * unitVertorU.x,
      y: midPoint.y - (length / 2) * Math.cos(translateAngle) * unitVertorU.y,
    };

    const P1 = new Point();
    P1.setXY(p1.x, p1.y);
    const P2 = new Point();
    P2.setXY(p2.x, p2.y);

    //判断推进点是否在向量的右边并且点是否在多边形内
    if (this.tool.isInVectorRight(this.currentPoint, this.nextPoint, P1)) {
      if (extendPoint) return [extendPoint, P1];
      else return P1;
    } else if (
      this.tool.isInVectorRight(this.currentPoint, this.nextPoint, P2)
    ) {
      if (extendPoint) return [extendPoint, P2];
      else return P2;
    } else {
      return false;
    }
  }

  //对大于180度的current点的角进行处理
  handleLargeAngle(boundaryData: Point[], d: number) {
    const angle = this.currentPoint.angle;
    if (angle > 180) {
      const halfAngle = angle * 0.5;
      //将角度换算成弧度
      const radians = (halfAngle * Math.PI) / 180;
      const vorter = {
        x: this.nextPoint.x - this.currentPoint.x,
        y: this.nextPoint.y - this.currentPoint.y,
      };
      const { length } = this.tool.measureLength(
        this.currentPoint,
        this.nextPoint
      );
      const direction = { x: vorter.x / length, y: vorter.y / length };
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);
      const Direc = {
        x: cos * direction.x - sin * direction.y,
        y: sin * direction.x + cos * direction.y,
      };

      const extendPoint = {
        x: this.currentPoint.x + d * Direc.x,
        y: this.currentPoint.y + d * Direc.y,
      };

      const p = new Point();
      p.setXY(extendPoint.x, extendPoint.y);

      if (this.tool.isPointInPolygon(boundaryData, p)) return p;
      else this.handleLargeAngle(boundaryData, d - d * 0.5);
    } else return false;
  }
}
