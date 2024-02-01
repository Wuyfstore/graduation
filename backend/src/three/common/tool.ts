import { Point } from './point';
import { PointChild } from './pointChild';
import * as turf from '@turf/turf';

export class Tool {
  tempAddPoints: Array<Point>;
  constructor() {
    this.tempAddPoints = [];
  }

  //处理数据，将数组[number.number] 变成{x:number,y:numberx:number,y:number}
  processData(boundaryData: Array<[number, number]>) {
    const processData = [];
    for (const data of boundaryData) {
      const [x, y] = data;
      const process = { x, y };
      processData.push(process);
    }
    return processData;
  }

  //墨卡托转成经纬度
  mercatorToLonLat(x: number, y: number) {
    const lon = (x / 20037508.34) * 180;
    const lat = (y / 20037508.34) * 180;
    const latRadians = (lat * Math.PI) / 180;
    const latDeg = 2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2;
    const latDegNormalized = (latDeg * 180) / Math.PI;

    return { lon: lon, lat: latDegNormalized };
  }

  //经纬度转墨卡托 E经度 N纬度
  lonLatToMercator(E: number, N: number) {
    const x = (E * 20037508.34) / 180;
    let y = Math.log(Math.tan(((90 + N) * Math.PI) / 360)) / (Math.PI / 180);
    y = (y * 20037508.34) / 180;
    return { x: x, y: y };
  }

  //计算长度
  measureLength(
    currentPoint: Point | PointChild,
    nextPoint: Point | PointChild
  ) {
    const vector = {
      x: nextPoint.x - currentPoint.x,
      y: nextPoint.y - currentPoint.y,
    };
    const length = Math.sqrt(vector.x ** 2 + vector.y ** 2);
    // 计算单位向量
    const unitVector = {
      x: vector.x / length,
      y: vector.y / length,
    };
    return { vector: vector, length: length, unitVector: unitVector };
  }

  //计算分割点位 m:标准
  reverseCalculatePoint(currentPoint: Point, nextPoint: Point, m: number) {
    let tempPoint: any = currentPoint;
    const vector = {
      x: nextPoint.x - tempPoint.x,
      y: nextPoint.y - tempPoint.y,
    };
    const length = Math.sqrt(vector.x ** 2 + vector.y ** 2);

    // 计算单位向量
    const unitVector = {
      x: vector.x / length,
      y: vector.y / length,
    };

    if (length > m) {
      // 计算添加点的位
      const reverseX = tempPoint.x + m * unitVector.x;
      const reverseY = tempPoint.y + m * unitVector.y;
      tempPoint = { x: reverseX, y: reverseY };
      this.tempAddPoints.push(tempPoint);
      this.reverseCalculatePoint(tempPoint, nextPoint, m);
    }
    // return { x: reverseX, y: reverseY }
  }

  //完成离散处理
  discrete(boundary: Point[], m: number) {
    const discreteData: Point[] = [];
    // if (boundary[0].x === boundary[boundary.length - 1].x) console.log(true);
    for (let i = 0; i < boundary.length - 1; i++) {
      const currentPoint = boundary[i];
      const nextPoint = boundary[i + 1];
      discreteData.push(currentPoint);
      if (nextPoint) {
        const reverseCalculatePoint = (current: Point, next: Point) => {
          const { length, unitVector } = this.measureLength(current, next);
          if (length > m) {
            // 计算添加点的位置
            const reverseX = current.x + m * unitVector.x;
            const reverseY = current.y + m * unitVector.y;
            const P = new Point();
            P.setXY(reverseX, reverseY);
            discreteData.push(P);
            reverseCalculatePoint(P, next);
          }
        };
        reverseCalculatePoint(currentPoint, nextPoint);
      }
    }
    // discreteData.push(discreteData[0]);
    // if (
    //   discreteData[discreteData.length - 1].x ===
    //   discreteData[discreteData.length - 2].x
    // )
    //   console.log('出现相同');
    return discreteData;
  }

  //计算点集中两点之间的最短距离 这是暴力求法
  measureMinDistance(pointArr: Point[]) {
    let minDistance = Infinity;
    for (let i = 0; i < pointArr.length - 1; i++) {
      const { length } = this.measureLength(pointArr[i], pointArr[i + 1]);
      if (length < minDistance) {
        minDistance = length;
      }
    }
    return minDistance;
  }

  //计算两向量之间的夹角
  measureAngle(
    currentPoint: Point,
    toLPoint: Point | PointChild,
    toRPoint: Point | PointChild
  ) {
    const L = this.measureLength(currentPoint, toLPoint);
    const R = this.measureLength(currentPoint, toRPoint);
    const L_magnitude = L.length;
    const R_magnitude = R.length;
    //点积
    const dotProduct = L.vector.x * R.vector.x + L.vector.y * R.vector.y;
    //计算夹角的弧度值
    const angleInRadians = Math.acos(dotProduct / (L_magnitude * R_magnitude));
    //弧度转成角度
    const angleInDegrees = (angleInRadians * 180) / Math.PI;
    return { L_magnitude, R_magnitude, angleInDegrees };
  }

  //计算多边形中的内角
  measureAngle2(
    currentPoint: Point,
    lastPoint: Point | PointChild,
    nextPoint: Point | PointChild
  ) {
    let angleInDegrees: number;
    const A = this.measureLength(lastPoint, currentPoint);
    const B = this.measureLength(currentPoint, nextPoint);
    //计算点积
    const dotProduct = this.dotProduct(A.unitVector, B.unitVector);
    const angleInRadians = Math.acos(dotProduct);

    //计算叉积
    const currentVertex = {
      x: currentPoint.x - lastPoint.x,
      y: currentPoint.y - lastPoint.y,
    };
    const nextVertex = {
      x: nextPoint.x - currentPoint.x,
      y: nextPoint.y - currentPoint.y,
    };
    const crossProduct = this.crossProduct(currentVertex, nextVertex);
    //弧度转成角度
    angleInDegrees = (angleInRadians * 180) / Math.PI;
    if (crossProduct < 0) {
      return angleInDegrees;
    } else {
      angleInDegrees = 360 - angleInDegrees;
      return angleInDegrees;
    }
  }

  // 点积
  dotProduct(a: { x: number; y: number }, b: { x: number; y: number }) {
    return a.x * b.x + a.y * b.y;
  }

  // 叉积
  crossProduct(a: { x: number; y: number }, b: { x: number; y: number }) {
    return a.x * b.y - b.x * a.y;
  }

  //判断推进点是否在向量的右边(顺时针情况下)
  isInVectorRight(current: Point, next: Point, p: Point, bool = true) {
    const currentVector = { x: next.x - current.x, y: next.y - current.y };
    const pVector = { x: p.x - current.x, y: p.y - current.y };
    //叉积
    const cross = this.crossProduct(pVector, currentVector);
    // console.log(cross);
    if (bool) {
      //if bool is true 顺时针
      //在右边 返回 true
      if (cross < 0) return true;
      else return false;
    } else {
      if (cross < 0) return false;
      else return true;
    }
  }

  //判断多边形是否顺时针
  booleanClockwice(boundary: [number, number][]) {
    const bool = turf.booleanClockwise(boundary);
    return bool;
  }

  //判断点是否在面中
  isPointInPolygon(
    boundaryData: Point[],
    P: Point | { x: number; y: number }
  ): boolean {
    // console.log(P);
    const pt = turf.point([P.x, P.y]);
    const poly = [];
    for (const point of boundaryData) {
      const p = [];
      p.push(point.x, point.y);
      poly.push(p);
    }
    const polygon = turf.polygon([poly]);
    const val = turf.booleanPointInPolygon(pt, polygon);
    // console.log(val);
    return val;
  }

  //获取Point类中的属性值，并包裹成threejs中的顶点数据
  //z值是顶点在threejs中的z轴坐标
  getPointToVertexData(point: Point | PointChild, z = 0) {
    const x = point.lon; //经度
    const y = point.lat; //纬度
    const vertex = { x: x, y: y, z: z };
    return vertex;
  }
}
