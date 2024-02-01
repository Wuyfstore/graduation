import { Tool } from './tool';
import { PointChild } from './pointChild';

export class Point {
  id: string | null;
  lon: number | null;
  lat: number | null;
  z: number | null;
  x: number | null;
  y: number | null;
  lastPoint: PointChild | null;
  nextPoint: PointChild | null;
  L_PTP: PointChild | null;
  R_PTP: PointChild | null;
  L_Magnitude: number | null;
  R_Magnitude: number | null;
  angle: boolean | null;
  value: number | null;
  isPushForward: '0' | '1' | null; //'1'可以推进 '0'不可以推进
  tool: Tool;

  constructor() {
    this.id = null;
    this.lon = null;
    this.lat = null;
    this.z = null;
    this.x = null;
    this.y = null;
    this.lastPoint = null;
    this.nextPoint = null;
    this.L_PTP = null;
    this.R_PTP = null;
    this.L_Magnitude = null;
    this.R_Magnitude = null;
    this.angle = null;
    this.value = null;
    this.isPushForward = null;
    this.tool = new Tool();
  }

  //设置ID
  setID(id: string) {
    if (!null) this.id = id;
    else return this.id;
  }

  //设置XY
  setXY(x: number, y: number) {
    this.x = x;
    this.y = y;
    if (!this.lon) this.mercatorToLonLat();
  }

  //设置z轴高度
  setZ(val: number) {
    this.z = val;
  }

  //设置经纬度
  setLonLat(lon: number, lat: number) {
    this.lon = lon;
    this.lat = lat;
    if (!this.x && !this.y) this.lonlatToMercator();
  }

  //传入lastPoint
  setLastPoint(point: PointChild) {
    this.lastPoint = point;
  }

  //传入nextPoint
  setNextPoint(point: PointChild) {
    this.nextPoint = point;
  }

  //传入左指向点  一个新的Point
  setLPTP(point: PointChild) {
    this.L_PTP = point;
  }

  //传入右指向点 一个新的Point
  setRPTP(point: PointChild) {
    this.R_PTP = point;
  }

  //设置是否推进
  setIsPushForward(val: '0' | '1') {
    if (this.isPushForward === null) return;
    else this.isPushForward = val;
  }

  //向量加法
  add(point: Point | PointChild): Point {
    const p = new Point();
    p.setXY(this.x + point.x, this.y + point.y);
    return p;
  }

  //向量减法
  subtract(point: Point | PointChild): Point {
    const p = new Point();
    p.setXY(this.x - point.x, this.y - point.y);
    return p;
  }

  //点积
  dotProduct(point: Point | PointChild) {
    return this.x * point.x + this.y * point.y;
  }

  //叉乘
  crossProduct(point: Point | PointChild) {
    return this.x * point.y - point.x * this.y;
  }

  //经纬度转墨卡托 E经度 N纬度
  lonlatToMercator() {
    if (this.lon && this.lat) {
      const { x, y } = this.tool.lonLatToMercator(this.lon, this.lat);
      this.x = x;
      this.y = y;
    }
  }

  //墨卡托转成经纬度
  mercatorToLonLat() {
    if (this.x && this.y) {
      const { lon, lat } = this.tool.mercatorToLonLat(this.x, this.y);
      this.lon = lon;
      this.lat = lat;
    }
  }

  //计算夹角
  measureAngle() {
    const currentPoint = new Point();
    currentPoint.setXY(this.x, this.y);
    const { L_magnitude, R_magnitude, angleInDegrees } = this.tool.measureAngle(
      currentPoint,
      this.L_PTP,
      this.R_PTP
    );

    this.L_Magnitude = L_magnitude;
    this.R_Magnitude = R_magnitude;
    if (angleInDegrees <= 90) this.angle = false;
    //表示小于90°
    else this.angle = true; //表示大于90°
  }
}
