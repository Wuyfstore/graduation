import {
  Viewer,
  ScreenSpaceEventHandler,
  Cartesian2,
  Cartesian3,
  Entity,
  Color,
  ScreenSpaceEventType,
  DistanceDisplayCondition,
  NearFarScalar,
  VerticalOrigin,
  LabelStyle,
  CallbackProperty
} from 'cesium'

export default class MeasureDistance {
  public viewer: Viewer // cesium 的 viewer
  public handler: ScreenSpaceEventHandler //cesium中点击的事件方法
  public positions: Array<Cartesian3>
  public tempPositions: Array<Cartesian3> //临时坐标
  public distances: Array<number>
  public Object: Array<Entity>
  public Objects: Array<Array<Entity>>
  public MeasureResult: number
  public isMeasure: boolean

  constructor(viewer: Viewer) {
    this.viewer = viewer
    this.handler = new ScreenSpaceEventHandler(this.viewer.scene.canvas)
    this.positions = []
    this.distances = []
    this.tempPositions = []
    this.Object = []
    this.Objects = []
    this.MeasureResult = 0
    this.isMeasure = false
  }

  //计算总长
  sumDistance() {
    if (this.distances.length === 0) return 0
    const sum = this.distances.reduce((accumulator, currentValue) => accumulator + currentValue)
    return sum
  }

  //激活
  activation(ismeasure: boolean) {
    this.disable(!ismeasure)
    this.isMeasure = ismeasure
    // 设置鼠标状态
    // this.viewer.canvas.style.cursor = 'default'
    this.registerEvents()
  }

  //禁用
  disable(ismeasure: boolean) {
    this.isMeasure = ismeasure
    this.releaseEvents()
    // this.viewer.canvas.style.cursor = 'pointer'
    this.positions = []
    this.distances = []
    this.MeasureResult = 0
  }

  // 清除绘制
  clear() {}

  //创建线对象
  createLineEntity() {
    const LineEntity = this.viewer.entities.add({
      polyline: {
        positions: new CallbackProperty(() => {
          return this.tempPositions
          // return this.positions
        }, false),
        width: 2,
        material: Color.YELLOW,
        depthFailMaterial: Color.YELLOW
      }
    })
    this.Object.push(LineEntity)
  }

  //创建线节点的label
  createLineLabel() {
    const distance = Cartesian3.distance(
      this.positions[this.positions.length - 1],
      this.positions[this.positions.length - 2]
    )
    const LineLabelEntity = this.viewer.entities.add({
      position: this.positions[this.positions.length - 1],
      label: {
        text: distance.toFixed(2) + '米',
        scale: 1.5,
        font: 'normal 24px MicroSoft YaHei',
        distanceDisplayCondition: new DistanceDisplayCondition(0, 200000),
        scaleByDistance: new NearFarScalar(1000, 1, 3000, 0.4),
        verticalOrigin: VerticalOrigin.BOTTOM,
        style: LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cartesian2(0, -30),
        outlineWidth: 1,
        outlineColor: Color.WHITE
      },
      point: {
        color: Color.WHITE,
        pixelSize: 6,
        disableDepthTestDistance: 500,
        outlineWidth: 1,
        outlineColor: Color.FUCHSIA
      }
    })
    this.distances.push(distance)
    this.Object.push(LineLabelEntity)
  }

  //创建起点
  createStartEntity() {
    const startEntity = this.viewer.entities.add({
      position: this.positions[0],
      label: {
        text: '起点',
        scale: 1.5,
        font: 'normal 24px MicroSoft YaHei',
        scaleByDistance: new NearFarScalar(300, 1, 1200, 0.4), //设置随图缩放距离和比例
        distanceDisplayCondition: new DistanceDisplayCondition(0, 200000), //设置可见距离 200000米可见
        verticalOrigin: VerticalOrigin.BOTTOM,
        pixelOffset: new Cartesian2(0, -10),
        outlineWidth: 1,
        outlineColor: Color.WHITE
      },
      point: {
        color: Color.WHITE,
        pixelSize: 6,
        outlineWidth: 1,
        outlineColor: Color.FUCHSIA
      }
    })
    this.Object.push(startEntity)
  }

  //创建终点
  createEndEntity() {
    this.MeasureResult = this.sumDistance()
    // 结束时删除最后一个节点的距离标识
    const lastLabel = this.Object[this.Object.length - 1]
    if (lastLabel) this.viewer.entities.remove(lastLabel)

    const endEntity = this.viewer.entities.add({
      position: this.positions[this.positions.length - 1],
      label: {
        text: '终点' + '总距离:' + this.MeasureResult.toFixed(2) + '米',
        scale: 1.5,
        font: 'normal 24px MicroSoft YaHei',
        distanceDisplayCondition: new DistanceDisplayCondition(0, 200000),
        scaleByDistance: new NearFarScalar(1000, 1, 3000, 0.4),
        verticalOrigin: VerticalOrigin.BOTTOM,
        style: LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cartesian2(0, -10),
        outlineWidth: 1,
        outlineColor: Color.WHITE,
        eyeOffset: new Cartesian3(0, 0, 10)
      },
      // billboard: {
      // image: '',
      // scaleByDistance: new NearFarScalar(300, 1, 1200, 0.4), //设置随图缩放距离和比例
      // distanceDisplayCondition: new DistanceDisplayCondition(0, 10000), //设置可见距离 10000米可见
      // verticalOrigin: VerticalOrigin.BOTTOM
      // },
      point: {
        color: Color.WHITE,
        pixelSize: 6,
        outlineColor: Color.FUCHSIA,
        outlineWidth: 1
      }
    })
    this.Object.push(endEntity)
  }

  // 计算Object中有几个point
  calculatePointEntityinObject() {
    let sum = 0
    for (const entity of this.Object) {
      if (entity.point) {
        sum += 1
      }
    }
    return sum
  }

  // 注册鼠标事件
  registerEvents() {
    this.leftClickEvent()
    this.mouseMoveEvent()
    this.rightClickEvent()
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
      // this.tempPositions.push(position)
      //   console.log(this.positions)

      if (this.positions.length === 1) {
        // 如果是首次点击，设置首次点击的样式
        this.createLineEntity()
        this.createStartEntity()
      } else {
        // 中间节点
        this.createLineEntity()
        this.createLineLabel()
      }
    }, ScreenSpaceEventType.LEFT_CLICK)
  }

  //右击事件 用于设置结束操作
  rightClickEvent() {
    this.handler.setInputAction((e: any) => {
      const sum = this.calculatePointEntityinObject()
      console.log(sum, this.tempPositions.length)

      if (this.tempPositions.length > sum) this.tempPositions.pop()
      this.createEndEntity()

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
      this.handleMoveEvent(position)
    }, ScreenSpaceEventType.MOUSE_MOVE)
  }

  //处理鼠标移动事件
  handleMoveEvent(position: Cartesian3) {
    // if (this.positions.length <= 1)
    this.tempPositions = this.positions.concat(position)
  }

  // 测量结束
  measureEnd(ismeasure: boolean) {
    this.disable(ismeasure)
  }

  //注销事件
  releaseEvents() {
    this.handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
    this.handler.removeInputAction(ScreenSpaceEventType.RIGHT_CLICK)
    this.handler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE)
  }
}
