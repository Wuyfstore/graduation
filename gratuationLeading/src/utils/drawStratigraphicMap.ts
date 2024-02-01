import { Viewer, Cartesian3, CallbackProperty, Color } from 'cesium'
import createSmoothLine from '@/utils/Bezier/fitBezier'
import { Guid } from '@/utils/commonFn'
import type { HTType } from '@/types/Props'

export class DrawStratigraphicMap {
  public viewer: Viewer //cesium视角
  public canvas: HTMLCanvasElement //用于存储画布 w 960 h 600
  public ctx: CanvasRenderingContext2D | null //开启绘图的上下文工具
  public maxGroundElevation: number //用于存储最大地面高度
  public scale: number //设置刻度用
  public dynamicSpacing: number //动态间距
  public minDeep: number //用于存储最大深度 主要进行设计canvas中 y轴
  public positions: Array<Cartesian3> //用于存储点击获得的点的位置信息
  public holePoints: Array<HTType> //用于存储点击的钻孔点
  public distance: Array<number> //用于存储两点之间的距离
  public totalDistance: number //用于存储总长
  public holesXY: Array<{ x: number; y: number }> //用于存储选中的hole在x轴上的坐标
  public layerMapArray: Map<string, any>[][]
  public unit: number //用于存储单位长度
  public isDraw: boolean //是否开启

  constructor(viewer: Viewer, canvas: HTMLCanvasElement) {
    this.viewer = viewer
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.positions = []
    this.holePoints = []
    this.distance = []
    this.holesXY = []
    this.layerMapArray = []
    this.unit = 0
    this.totalDistance = 0
    this.maxGroundElevation = 0
    this.scale = 0
    this.minDeep = 0
    this.dynamicSpacing = 0
    this.isDraw = false
  }

  // 激活 true
  activation(isdraw: boolean) {
    this.isDraw = isdraw
  }

  // 关闭 false
  disable(isdraw: boolean) {
    this.isDraw = isdraw
    // 注销所有事件
  }

  //绘制所有信息
  drawAll() {
    this.measureDeepElevation()
    this.measureScale()
    this.drawYAxis()
    this.drawHoleAxis()
    this.drawXAxis()
    this.drawScale()
    this.processData() //处理数据 this.holePoints
    this.setDistanceToLayerMapArray(this.distance, this.holesXY, this.holePoints)
    this.contrastGeoNumbering()
    this.drawText()
  }

  //在地图上绘制线实体
  drawLineEntity() {
    const id = Guid()
    this.viewer.entities.add({
      id: id,
      polyline: {
        positions: new CallbackProperty(() => {
          return this.positions
        }, false),
        width: 2,
        material: Color.WHITE,
        depthFailMaterial: Color.WHITE
      }
    })
    return id
  }

  //清除绘制的line
  removeLineEntity(id: string) {
    this.viewer.entities.removeById(id)
  }

  //计算两点之间的距离
  MeasureDistance(p1: Cartesian3, p2: Cartesian3) {
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance
  }

  //获取最深的层底标高 和最高的地面标高
  measureDeepElevation() {
    /*获取最深的层底标高
    计算钻孔地面高度 （有些需要进行计算）*/
    if (this.holePoints.length !== 0) {
      // 取最深的层底标高
      for (const hole of this.holePoints) {
        if (hole.items.length === 0) return
        const elevation = hole.items[hole.items.length - 1].elevation
        if (elevation <= this.minDeep) this.minDeep = elevation

        // 计算钻孔地面高度 （有些需要进行计算）
        const groundElevation = hole.items[0].elevation + hole.items[0].buriedDeep
        // 获得最高地面值
        if (groundElevation >= this.maxGroundElevation) this.maxGroundElevation = groundElevation
      }
      // 向下取整
      this.minDeep = Math.floor(this.minDeep)
      // 向上取整
      this.maxGroundElevation = Math.ceil(this.maxGroundElevation)
    }
  }

  //计算单位长度
  measureScale() {
    // 现已知 y轴长 465 计算 1 代表多少 后面用于确定位置 用435是因为下边都留有空余
    this.unit = 435 / (this.maxGroundElevation - this.minDeep) //这是比率
  }

  //处理数据信息，该合并的合并
  processData() {
    for (const hole of this.holePoints) {
      for (const index in hole.items) {
        const previousIndex = Number(index) - 1
        const nextIndex = Number(index) + 1
        const numbering = hole.items[index].numbering //地质层 例如1-1 2-1等
        const previousNumbering = hole.items[previousIndex]
          ? hole.items[previousIndex].numbering
          : false //上一个地层
        const nextNumberimg = hole.items[nextIndex] ? hole.items[nextIndex].numbering : false //下一个地层
        const thickness = hole.items[index].thickness //地层厚度
        //如果地层厚度小于2 就需要将其合并到相邻的地质层 1-1 → 1-2 不能 1-1 → 2-1
        if (thickness < 2) {
          if (nextNumberimg && nextNumberimg[0] === numbering[0]) {
            hole.items[nextIndex].thickness += thickness
            hole.items.splice(Number(index), 1) // 删除当前的hole.items[index]
          } else if (previousNumbering && previousNumbering[0] === numbering[0]) {
            hole.items[previousIndex].thickness += thickness
            hole.items.splice(Number(index), 1) // 删除当前的hole.items[index]
          }
        }
      }
    }
    //经过确认，厚度小于2的被合并
    // console.log(this.holePoints)
  }

  //将距离放在layerMapArray里
  setDistanceToLayerMapArray(
    distanceArray: Array<number>,
    xy: Array<{ x: number; y: number }>,
    holes: Array<HTType>
  ) {
    const length = this.holePoints.length
    for (let i = 0; i < length; i++) {
      this.layerMapArray.push([])
    }

    for (let i = 0; i < this.layerMapArray.length; i++) {
      const val = [distanceArray[i - 1], distanceArray[i]]
      const distanceMap = new Map()
      const xyMap = new Map()
      distanceMap.set('distance', val)
      xyMap.set('position', xy[i])
      this.layerMapArray[i].push(distanceMap)
      this.layerMapArray[i].push(xyMap)
      const layerMap = new Map()
      for (const item of holes[i].items) {
        layerMap.set(item.numbering, { deep: item.buriedDeep, thickness: item.thickness })
      }
      this.layerMapArray[i].push(layerMap)
    }
    // console.log(this.layerMapArray)
    this.contrastGeoNumbering()
  }

  //对处理后的数据进行操作
  contrastGeoNumbering() {
    const layerMap = new Map()
    const keys = []
    //数据是 this.layerMapArray 长度设计好的只有3 distance Map |position Map |layers Map
    for (const index in this.layerMapArray) {
      const layerKeys = Array.from(this.layerMapArray[index][2].keys())
      for (const key of layerKeys) {
        const PointToMap = new Map()
        const val = this.layerMapArray[index][2].get(key)
        if (layerMap.has(key)) {
          const mapVal = layerMap.get(key)
          mapVal.push(PointToMap.set(index, val))
          layerMap.set(key, mapVal)
        } else {
          keys.push(key)
          layerMap.set(key, [PointToMap.set(index, val)])
        }
      }
    }
    //按自定义规则排序
    keys.sort(this.customSort)
    this.measureElapsePoints(layerMap, keys)
    // console.log(layerMap, keys)
  }

  //自定义字符串比较函数
  customSort(a: string, b: string) {
    const aParts = a.split('-')
    const bParts = b.split('-')

    const aNumber = parseInt(aParts[0])
    const bNumber = parseInt(bParts[0])

    if (aNumber < bNumber) {
      return -1
    } else if (aNumber > bNumber) {
      return 1
    } else {
      const aSubNumber = aParts.length > 1 ? parseInt(aParts[1]) : 0
      const bSubNumber = bParts.length > 1 ? parseInt(bParts[1]) : 0

      if (aSubNumber < bSubNumber) {
        return -1
      } else if (aSubNumber > bSubNumber) {
        return 1
      } else {
        return 0
      }
    }
  }

  //计算每一层中需要经过的点
  measureElapsePoints(layerMap: Map<any, Array<Map<any, any>>>, keys: Array<string>) {
    console.log(layerMap)
    let tempLineArray: Array<any>
    const L = this.layerMapArray.length
    for (const key of keys) {
      const points = layerMap.get(key)!
      const length = points.length
      if (length === L) {
        const linePoints = []
        for (const index in points) {
          const object = points[index].get(index)!
          const holedeep = this.unit * object.deep + this.holesXY[index].y
          const xy = this.layerMapArray[index][1].get('position')!
          linePoints.push({ x: xy.x, y: holedeep })
        }
        tempLineArray = linePoints
        this.drawLine(linePoints)
      }
      if (length < L) {
        const linePoints = []
        const tempKeys = []
        for (const index in points) {
          const key = Array.from(points[index].keys())
          tempKeys.push(key)
          for (const item of tempKeys) {
            const val = points[index].get(item[0])
          }
        }
        // console.log(tempKeys)
      }
    }
  }

  //绘制y轴 和 钻孔点位  这里面绘制钻孔的方法是可以优化的
  drawYAxis() {
    //设置不同深度情况下使用单位长度的刻度
    switch (true) {
      // case this.minDeep >= -50: {
      //   this.scale = 5
      //   break
      // }
      case this.minDeep >= -200 && this.minDeep < 0: {
        this.scale = 10
        break
      }
      case this.minDeep < -200: {
        this.scale = 20
        break
      }
      default: {
        this.scale = 10
      }
    }
    this.dynamicSpacing = this.unit * this.scale
    if (this.ctx) {
      // 画两处Y轴
      // 创建路径
      this.ctx.beginPath()
      // 移动画笔到(30,30)处
      this.ctx.moveTo(60, 30)
      //画直线到(30,570)处
      this.ctx.lineTo(60, 500)
      // 关闭路径
      this.ctx.closePath()
      // 移动画笔到(930,30)处
      this.ctx.moveTo(940, 30)
      //画直线到(930,570)处
      this.ctx.lineTo(940, 500)
      // 关闭路径
      this.ctx.closePath()

      // console.log(this.holesXY)
      // 直线描边
      this.ctx.stroke()
    }
  }

  // 绘制x轴 880
  drawXAxis() {
    this.drawLine(this.holesXY)
  }

  drawHoleAxis() {
    if (this.ctx) {
      // 画钻孔
      //两边比例按照5%算，两边共10% 起点坐标(104,30) 终点坐标(896,30) 长792
      //画第一个和最后一个钻孔
      const firstX = 104,
        Y = 35
      this.ctx.font = '10px Arial'

      let ps = 0 // 用于存储占比
      let persent = 0 //计算两点之间的距离与总长的占比
      const tempArray = [] //临时存储转换后的cartesian3坐标
      // const tempLength = [] //临时存储两点之间的长度
      for (const item of this.holePoints) {
        //经纬度坐标转换成Cartesian3坐标
        const cartesian = Cartesian3.fromDegrees(item.lon, item.lat, 0)
        tempArray.push(cartesian)
      }
      for (let i = 0; i < tempArray.length - 1; i++) {
        const length = this.MeasureDistance(tempArray[i], tempArray[i + 1])
        this.distance.push(length)
        this.totalDistance += length
      }

      // console.log(tempLength[-1],tempLength[tempLength.length])
      // 绘制hole轴
      for (let i = 0; i <= this.holePoints.length - 1; i++) {
        const tempD = 792 * persent
        const holeX = firstX + tempD
        const hole = this.holePoints[i]
        const elevation = hole.items[0].elevation + hole.items[0].thickness
        const deep = hole.items[hole.items.length - 1].buriedDeep
        const increment = elevation > 0 ? 5 - elevation : -elevation + 5 //这里是为了地表高程在水平以下的加上5
        const incrementDeep = Y + increment * this.unit
        const holedeep = this.unit * deep + incrementDeep
        this.holesXY.push({ x: holeX, y: incrementDeep })
        this.ctx.lineWidth = 1
        this.ctx.moveTo(holeX, incrementDeep)
        this.ctx.lineTo(holeX, holedeep)
        this.ctx.closePath()
        this.ctx.moveTo(holeX - 3, holedeep)
        this.ctx.lineTo(holeX + 3, holedeep)
        this.ctx.closePath()
        // 计算地面标高
        const holeGroundElevation = elevation.toFixed(2)
        const holeLabel = hole.label //钻孔名称
        const holeGroundElevationX = holeX - this.ctx.measureText(holeGroundElevation).width / 2 //计算地面标高标注的X
        const labelNameX = holeX - this.ctx.measureText(holeLabel).width / 2 //计算钻孔名称标注的x
        this.ctx.fillText(holeLabel, labelNameX, 30 - 10)
        this.ctx.closePath()
        this.ctx.fillText(holeGroundElevation, holeGroundElevationX, 30 + 3)
        this.ctx.closePath()
        this.ctx.moveTo(labelNameX + 4, 30 - 7)
        this.ctx.lineTo(labelNameX + this.ctx.measureText(holeLabel).width - 4, 30 - 7)
        this.ctx.closePath()
        if (i < this.holePoints.length - 1) {
          ps = this.distance[i] / this.totalDistance
          persent = ps + persent
        }
      }
      // 直线描边
      this.ctx.stroke()
    }
  }

  // 绘制刻度
  drawScale() {
    const bg = '标高(m)'
    const x1 = 10,
      x2 = 950,
      y = 15,
      h = 30
    if (this.ctx) {
      this.ctx.font = '12px Arial'
      this.ctx.fillText(bg, x1, y)
      this.ctx.fillText(bg, x2, y)
      const multipleOfFive = Math.ceil(this.maxGroundElevation / 5) * 5
      //这里绘制的是初始刻度

      // 创建路径
      this.ctx.beginPath()
      const k = Math.ceil(470 / this.dynamicSpacing)
      for (let i = 0; i < k; i++) {
        const tempMultipleOfFive = (multipleOfFive - i * this.scale).toString()
        // 移动画笔到(60,35)处
        this.ctx.moveTo(60, h + i * this.dynamicSpacing)
        //画直线到(40, 35)处
        this.ctx.lineTo(55, h + i * this.dynamicSpacing)
        this.ctx.fillText(
          tempMultipleOfFive,
          x1 +
            this.ctx.measureText(bg).width / 2 -
            this.ctx.measureText(tempMultipleOfFive).width / 2,
          34 + i * this.dynamicSpacing
        )
        // 关闭路径
        this.ctx.closePath()
        this.ctx.moveTo(940, h + i * this.dynamicSpacing)
        //画直线到(40, 35)处
        this.ctx.lineTo(945, h + i * this.dynamicSpacing)
        this.ctx.fillText(
          tempMultipleOfFive,
          x2 +
            this.ctx.measureText(bg).width / 2 -
            this.ctx.measureText(tempMultipleOfFive).width / 2,
          34 + i * this.dynamicSpacing
        )
        // 关闭路径
        this.ctx.closePath()
      }
      // 直线描边
      this.ctx.stroke()
    }
  }

  //绘制线 当前思路：两两之间绘制 比如[p1,p2,p3] 那么绘制p1→p2，p2→p3
  drawLine(points: { x: number; y: number }[]) {
    const newHolesXY = points.slice() //创建数组副本
    newHolesXY.unshift({ x: 60, y: points[0].y })
    newHolesXY.push({ x: 940, y: points[points.length - 1].y })
    const s = createSmoothLine(newHolesXY)
    // console.log(s)
    if (this.ctx && s) {
      this.ctx.beginPath()
      this.ctx.moveTo(newHolesXY[0].x, newHolesXY[0].y)
      const tempS = s.filter(
        (item) => item.x >= newHolesXY[0].x && item.x <= newHolesXY[newHolesXY.length - 1].x
      )
      for (const item of tempS) {
        this.ctx.lineTo(item.x, item.y)
      }
      this.ctx.stroke()
    }
  }

  //绘制文本
  drawText() {
    // if (this.ctx) {
    // }
  }

  // 判断是否具有间灭现象 并计算地点 两两比较
  // isHasLeftOrRight(p1: Cartesian3, p2: Cartesian3) {
  //   // 计算两点之间的距离
  //   this.MeasureDistance(p1, p2)
  //   switch (true) {
  //     /*小于2的 时候同一大地类就合并，向上向下都可以，不同一类就暂时不要合并*/
  //     case this.distance < 2: {
  //       break
  //     }
  //     case this.distance >= 2 && this.distance < 5: {
  //       const point = this.distance * (1 / 3)
  //       break
  //     }
  //     case this.distance >= 5 && this.distance < 8: {
  //       const point = this.distance * (1 / 2)
  //       break
  //     }
  //     case this.distance >= 8: {
  //       const point = this.distance * (2 / 3)
  //       break
  //     }
  //   }
  // }
}
