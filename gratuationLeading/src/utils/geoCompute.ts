//{x: -2794920.764531012, y: 4634798.007854781, z: 3363388.0007187445}
import { Cartesian3 } from 'cesium'
// 计算平面两点距离
export const calculateDistance = (point1: Cartesian3, point2: Cartesian3) => {
  // console.log('P1', point1)
  // console.log('P2', point2)
  const dx = point1.x - point2.x
  const dy = point1.y - point1.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance
}

// 计算不规则多边形的面积
export const calculatePolygonArea = (vertices: Cartesian3[]) => {
  const n = vertices.length
  let area = 0

  for (let i = 0; i < n; i++) {
    const currentVertex = vertices[i]
    const nextVertex = vertices[(i + 1) % n]

    area += currentVertex.x * nextVertex.y - nextVertex.x * currentVertex.y
  }

  area = Math.abs(area) / 2

  return area
}
