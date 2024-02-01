import { Vector2D } from '@/utils/Bezier/Vector2D'
import { vector2dMinus, vector2dPlus } from '@/utils/Bezier/Vector2D'
import create2PBezier from '@/utils/Bezier/bezier2P'
import create3PBezier from '@/utils/Bezier/bezier3P'
import type { Point } from '@/types/Props'

/**
 * 生成平滑曲线所需的控制点
 *
 * @param {Vector2D} p1
 * @param {Vector2D} pt
 * @param {Vector2D} p2
 * @param {number} [ratio=0.3]
 * @return {*}
 * @memberof Path
 */
const createSmoothLineControlPoint = (
  p1: Vector2D,
  pt: Vector2D,
  p2: Vector2D,
  ratio: number = 0.3
) => {
  const vec1T: Vector2D = vector2dMinus(p1, pt)
  const vecT2: Vector2D = vector2dMinus(p1, pt)
  const len1: number = vec1T.length
  const len2: number = vecT2.length
  const v: number = len1 / len2
  let delta
  if (v > 1) {
    delta = vector2dMinus(p1, vector2dPlus(pt, vector2dMinus(p2, pt).scale(1 / v)))
  } else {
    delta = vector2dMinus(vector2dPlus(pt, vector2dMinus(p1, pt).scale(v)), p2)
  }
  delta = delta.scale(ratio)
  const control1: Point = {
    x: vector2dPlus(pt, delta).x,
    y: vector2dPlus(pt, delta).y
  }
  const control2: Point = {
    x: vector2dMinus(pt, delta).x,
    y: vector2dMinus(pt, delta).y
  }
  return { control1, control2 }
}

/**
 * 平滑曲线生成
 *
 * @param {Point []} points
 * @param {number} ratio
 * @return {*}
 * @memberof Path
 */
const createSmoothLine = (points: Point[], ratio: number = 0.3): Point[] | undefined => {
  const len = points.length
  let resultPoints: any = []
  const controlPoints = []
  if (len < 3) return
  for (let i = 0; i < len - 2; i++) {
    const { control1, control2 } = createSmoothLineControlPoint(
      new Vector2D(points[i].x, points[i].y),
      new Vector2D(points[i + 1].x, points[i + 1].y),
      new Vector2D(points[i + 2].x, points[i + 2].y),
      ratio
    )
    controlPoints.push(control1)
    controlPoints.push(control2)
    let points1
    let points2

    // 首端控制点只用一个
    if (i === 0) {
      points1 = create2PBezier(points[i], control1, points[i + 1], 50)
    } else {
      // console.log(controlPoints)
      points1 = create3PBezier(points[i], controlPoints[2 * i - 1], control1, points[i + 1], 50)
    }
    // 尾端部分
    if (i + 2 === len - 1) {
      points2 = create2PBezier(points[i + 1], control2, points[i + 2], 50)
    }

    if (i + 2 === len - 1 && points2 !== undefined) {
      resultPoints = [...resultPoints, ...points1, ...points2]
    } else {
      resultPoints = [...resultPoints, ...points1]
    }
  }
  return resultPoints
}

export default createSmoothLine
