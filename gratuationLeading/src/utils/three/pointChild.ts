import { Point } from './point'

export class PointChild {
  lon: number | null
  lat: number | null
  z: number | null
  x: number | null
  y: number | null
  isPushForward: '0' | '1' | null

  constructor(p: Point) {
    this.lon = p.lon
    this.lat = p.lat
    this.x = p.x
    this.y = p.y
    this.z = p.z
    this.isPushForward = p.isPushForward
  }

  setIsPushForward(val: '0' | '1') {
    this.isPushForward = val
  }
}
