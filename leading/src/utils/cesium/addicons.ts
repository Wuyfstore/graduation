import {
  Cartesian3,
  Cartesian2,
  VerticalOrigin,
  HorizontalOrigin,
  DistanceDisplayCondition,
  Entity
} from 'cesium'
import { Guid } from '@/utils/common/guid'

/**
 * @description 在Cesium地图上添加图标 可以通用
 * @param {Cartesian3} p 最好是Cartesian3的类型
 * @param path
 */
const addIcon = (
  p: { longitude: number; latitude: number; height?: number | undefined },
  path: string,
  id?: string
) => {
  const Id = id ? id : 'Icon-' + Guid()
  const entity = new Entity({
    id: Id,
    position: Cartesian3.fromDegrees(p.longitude, p.latitude, p.height),
    billboard: {
      width: 23,
      height: 30,
      image: new URL('../../assets/img/map/' + path, import.meta.url).href, //图像地址，URL或者Canvas属性
      sizeInMeters: false, //大小是否以米为单位
      verticalOrigin: VerticalOrigin.CENTER, //相对于坐标的垂直位置
      horizontalOrigin: HorizontalOrigin.LEFT, //相对于坐标的水平位置
      pixelOffset: new Cartesian2(0, 0), //该属性指定标签在屏幕空间中距此标签原点的像素偏移量
      scale: 1.0, //应用于图像的统一比例，比例大于1放大标签，小于1缩小标签，
      distanceDisplayCondition: new DistanceDisplayCondition(0, 15000000), //显示在据相机的距离处的属性，多少区间内是可以显示的
      show: true
    }
  })
  window.viewer.entities.add(entity)
}

/**
 * @description 通过id移除entity
 * @param {string} id entity 的 id
 */
const removeEntityById = (id: string) => {
  window.viewer.entities.removeById(id)
}

export { addIcon, removeEntityById }
