import { Point } from './point';

export class PointChild {
  id: string | null;
  lon: number | null;
  lat: number | null;
  z: number | null;
  x: number | null;
  y: number | null;
  value: number | null;
  isPushForward: boolean | null;

  constructor(p: Point) {
    this.lon = p.lon;
    this.lat = p.lat;
    this.x = p.x;
    this.y = p.y;
    this.z = p.z;
    this.isPushForward = p.isPushForward;
  }

  setIsPushForward(val: boolean) {
    this.isPushForward = val;
  }
}
