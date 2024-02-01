import {
  Viewer,
  ScreenSpaceEventHandler,
  Cartesian2,
  Cartesian3,
  Entity,
  ScreenSpaceEventType,
  CallbackProperty,
  PolygonHierarchy,
  PolylineDashMaterialProperty,
  Color,
  DistanceDisplayCondition,
  ColorMaterialProperty,
  NearFarScalar,
  VerticalOrigin,
  LabelStyle
} from 'cesium'
import { calculatePolygonArea } from '@/utils/geoCompute'

export default class MeasureArea {
  public viewer: Viewer
  public handler: ScreenSpaceEventHandler
  public positions: Array<Cartesian3>
  // public tempPositions: Array<Cartesian3> //临时坐标
  public Object: Array<Entity>
  public Objects: Array<Array<Entity>>
  public MeasureResult: number
  public isMeasure: boolean

  constructor(viewer: Viewer) {
    this.viewer = viewer
    this.handler = new ScreenSpaceEventHandler(this.viewer.scene.canvas)
    this.positions = []
    // this.tempPositions = []
    this.Object = []
    this.Objects = []
    this.MeasureResult = 0
    this.isMeasure = false
  }

  //激活 false
  activation(ismeasure: boolean) {
    this.disable(!ismeasure)
    this.isMeasure = ismeasure
    // 设置鼠标状态
    // this.viewer.canvas.style.cursor = 'default'
    this.registerEvents()
  }

  //禁用 false
  disable(ismeasure: boolean) {
    this.isMeasure = ismeasure
    this.releaseEvents()
    // this.viewer.canvas.style.cursor = 'pointer'
    this.positions = []
    this.MeasureResult = 0
  }

  // 清除绘制
  clear() {}

  //创建面对象
  createPolygonEntity() {
    const polygonEntity = this.viewer.entities.add({
      polygon: {
        hierarchy: new CallbackProperty(() => {
          return new PolygonHierarchy(this.positions)
        }, false),
        material: Color.RED.withAlpha(0.1)
      },
      polyline: {
        positions: new CallbackProperty(() => {
          return this.positions
        }, false),
        width: 1,
        material: new PolylineDashMaterialProperty({
          color: Color.YELLOW
        }),
        depthFailMaterial: new PolylineDashMaterialProperty({
          color: Color.YELLOW
        })
      }
    })
    // this.Object.push(polygonEntity)
    return polygonEntity
  }

  //创建点对象
  createPointEntity() {
    const pointEntity = this.viewer.entities.add({
      position: this.positions[this.positions.length - 1],
      point: {
        color: Color.FUCHSIA,
        pixelSize: 6,
        disableDepthTestDistance: 500
      }
    })
    this.Object.push(pointEntity)
  }

  // 创建label对象
  createLabelEntity() {
    if (this.positions.length > 1) {
      const list = this.positions
      const position = this.calculateGeoCenter(this.positions)!
      this.MeasureResult = calculatePolygonArea(list.slice(0, list.length - 1))
      const label = this.viewer.entities.add({
        position: position,
        label: {
          text: '面积:' + (this.MeasureResult / 1000000).toFixed(2) + '平方千米',
          scale: 1.5,
          font: 'normal 24px MicroSoft YaHei',
          distanceDisplayCondition: new DistanceDisplayCondition(0, 200000),
          scaleByDistance: new NearFarScalar(1000, 1, 3000, 0.4),
          verticalOrigin: VerticalOrigin.BOTTOM,
          style: LabelStyle.FILL_AND_OUTLINE,
          //   pixelOffset: new Cartesian2(0, -10),
          outlineWidth: 1,
          outlineColor: Color.WHITE,
          eyeOffset: new Cartesian3(0, 0, 10)
        }
      })
      this.Object.push(label)
    }
  }

  //计算几何中心
  calculateGeoCenter(positions: Cartesian3[]) {
    const n = positions.length
    if (n === 0) return null

    let centerX = 0
    let centerY = 0
    let centerZ = 0

    for (const position of positions) {
      centerX += position.x
      centerY += position.y
      centerZ += position.z
    }

    centerX /= n
    centerY /= n
    centerZ /= n

    return new Cartesian3(centerX, centerY, centerZ)
  }

  // 注册鼠标事件
  registerEvents() {
    if (this.isMeasure) {
      this.leftClickEvent()
      this.mouseMoveEvent()
      this.rightClickEvent()
    }
  }

  //左击事件
  leftClickEvent() {
    this.handler.setInputAction((e: any) => {
      // 设置左击的鼠标样式
      this.viewer.canvas.style.cursor = 'default'
      // 获取点击位置
      let position: Cartesian3 | undefined = this.viewer.scene.pickPosition(e.position)

      // 如果没有获取到，就利用椭球体获取地理坐标
      if (!position) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid
        position = this.viewer.scene.camera.pickEllipsoid(e.position, ellipsoid)
      }
      //如果还是没有获取到 ，就直接return
      if (!position) return
      //获取到坐标，将其放在positions中
      this.positions.push(position)
      this.createPolygonEntity()
      this.createPointEntity()
    }, ScreenSpaceEventType.LEFT_CLICK)
  }

  //右击事件 用于设置结束操作
  rightClickEvent() {
    this.handler.setInputAction((e: any) => {
      this.positions.push(this.positions[0])
      // this.tempPositions.push(this.positions[0])

      this.createLabelEntity()
      if (!this.isMeasure || this.positions.length < 1) {
        this.disable(!this.isMeasure)
        this.clear()
      }
      // 注销所有事件
      this.releaseEvents()
    }, ScreenSpaceEventType.RIGHT_CLICK)
  }

  //移动事件
  mouseMoveEvent() {
    this.handler.setInputAction((e: any) => {
      if (!this.isMeasure) return
      this.viewer.canvas.style.cursor = 'default'
      let position: Cartesian3 | undefined = this.viewer.scene.pickPosition(e.endPosition)
      if (!position) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid
        position = this.viewer.scene.camera.pickEllipsoid(e.startPosition, ellipsoid)
      }
      if (!position) return
      // this.tempPositions = this.positions.concat(position)
    }, ScreenSpaceEventType.MOUSE_MOVE)
  }

  // 测量结束
  measureEnd(ismeasure: boolean) {
    this.disable(ismeasure)
  }

  //注销事件
  releaseEvents() {
    if (!this.isMeasure) {
      this.handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
      this.handler.removeInputAction(ScreenSpaceEventType.RIGHT_CLICK)
      this.handler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE)
    }
  }
}
