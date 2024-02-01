import type { Point } from "@/types/Props"
/**
 * 三次方塞尔曲线公式
 *
 * @param {number} p0
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @param {number} t
 * @return {*}
 * @memberof Path
 */
const bezier3P = (p0: number, p1: number, p2: number, p3: number, t: number) => {
  const P0 = p0 * Math.pow(1 - t, 3)
  const P1 = 3 * p1 * t * Math.pow(1 - t, 2)
  const P2 = 3 * p2 * Math.pow(t, 2) * (1 - t)
  const P3 = p3 * Math.pow(t, 3)
  return P0 + P1 + P2 + P3
}

/**
 * 获取坐标
 *
 * @param {Point} p0
 * @param {Point} p1
 * @param {Point} p2
 * @param {Point} p3
 * @param {number} num
 * @param {number} tick
 * @return {*}
 * @memberof Path
 */
const getBezierNowPoint3P = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  num: number,
  tick: number
) => {
  return {
    x: bezier3P(p0.x, p1.x, p2.x, p3.x, num * tick),
    y: bezier3P(p0.y, p1.y, p2.y, p3.y, num * tick)
  }
}

/**
 * 生成三次方贝塞尔曲线顶点数据
 *
 * @param {Point} p0 起始点  { x : number, y : number}
 * @param {Point} p1 控制点1 { x : number, y : number}
 * @param {Point} p2 控制点2 { x : number, y : number}
 * @param {Point} p3 终止点  { x : number, y : number}
 * @param {number} [num=100]
 * @param {number} [tick=1]
 * @return {Point []}
 * @memberof Path
 */
const create3PBezier = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  num: number = 100,
  tick: number = 1
) => {
  const pointMum = num
  const _tick = tick
  const t = _tick / (pointMum - 1)
  const points = []
  for (let i = 0; i < pointMum; i++) {
    const point = getBezierNowPoint3P(p0, p1, p2, p3, i, t)
    points.push({ x: point.x, y: point.y })
  }
  return points
}

export default create3PBezier
