import {
  Viewer,
  Math,
  Ion,
  SkyBox,
  Cartesian3,
  Rectangle,
  Camera,
  Matrix4,
  EasingFunction,
  Entity,
  EntityCollection,
  DataSource,
  ImageryLayer,
  Cesium3DTileset,
  TimeDynamicPointCloud,
  VoxelPrimitive,
  HeadingPitchRange,
  HeadingPitchRollValues,
  DirectionUp,
  ImageryLayerCollection,
  ArcGisMapServerImageryProvider,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  defined,
  GeoJsonDataSource,
  Color,
  IonImageryProvider
} from 'cesium'
import { Guid } from '@/utils/commonFn'
import getToken from '@/assets/config/cesiumToken'

class CesiumClass {
  public viewer: Viewer | null = null
  public layers: ImageryLayerCollection | undefined = this.viewer?.scene.imageryLayers
  public screenSpaceEventHandler: ScreenSpaceEventHandler | undefined =
    this.viewer?.screenSpaceEventHandler
  public cesiumEventAction = new Map()
  public cesiumEventActionType = new Map()
  public cesiumEntitiesCollection = new Map()
  public defaultOptions: Viewer.ConstructorOptions = {
    // 视图模型选择按钮
    sceneModePicker: false, // 全屏按钮
    fullscreenButton: false, // 首页按钮
    homeButton: false, // 底图选择按钮
    baseLayerPicker: false, // 导航工具按钮
    navigationHelpButton: false,
    geocoder: false,
    selectionIndicator: false,
    navigationInstructionsInitiallyVisible: false,
    infoBox: false,
    // navigation: false,
    timeline: false,
    animation: false,
    creditContainer: document.createElement('div'), //隐藏logo
    msaaSamples: 2,
    depthPlaneEllipsoidOffset: 5,
    useBrowserRecommendedResolution: false // 是否选择浏览器推荐分辨率
  }

  private token: string = getToken()

  /**
   * @param container DivElement id
   * @param options Viewer.ConstructorOptions
   * @return viewer
   * */
  async setViewer(container: string | Element, options?: Viewer.ConstructorOptions) {
    Ion.defaultAccessToken = this.token
    if (options) {
      Object.assign(this.defaultOptions, options)
    }
    this.viewer = new Viewer(container, this.defaultOptions)
    // 这个是加载影像图
    this.viewer.imageryLayers.addImageryProvider(await IonImageryProvider.fromAssetId(2, {}))
  }

  ZoomTo(options: any) {
    if (this.viewer) {
      const Viewer = this.viewer
      Viewer.zoomTo(options)
    }
  }

  /**
   * @param options skybox配置项
   * 设置天空
   *  */
  setSkyBox(options: { sources?: any; show?: boolean }) {
    if (this.viewer) {
      this.viewer.scene.skyBox = new SkyBox(options)
    }
  }

  /**
   * cameraSetView
   * @param options 配置项
   */
  cameraSetView(options: {
    destination?: Cartesian3 | Rectangle
    orientation?: HeadingPitchRollValues | DirectionUp
    endTransform?: Matrix4
    convert?: boolean
  }) {
    if (this.viewer) {
      this.viewer.scene.camera.setView(options)
    }
  }

  /**
   *@param options 配置项
   *设置相机位置
   *  */
  cameraFlyTo(options: {
    destination: Cartesian3 | Rectangle
    orientation?: any
    duration?: number
    complete?: Camera.FlightCompleteCallback
    cancel?: Camera.FlightCancelledCallback
    endTransform?: Matrix4
    maximumHeight?: number
    pitchAdjustHeight?: number
    flyOverLongitude?: number
    flyOverLongitudeWeight?: number
    convert?: boolean
    easingFunction?: EasingFunction.Callback
  }) {
    if (this.viewer) {
      this.viewer.camera.flyTo(options)
    }
  }

  /**
   *  获取相机位置等信息
   *  */
  getCameraPositionInfo() {
    if (this.viewer) {
      // 获取相机姿态信息
      const head = this.viewer.scene.camera.heading
      const pitch = this.viewer.scene.camera.pitch
      const roll = this.viewer.scene.camera.roll
      const info = { head, pitch, roll }

      // 获取位置信息 wgs84坐标系 ， x,y坐标值以弧度来表示
      const position = this.viewer.scene.camera.positionCartographic
      //以下方式也可以获取相机位置只是返回的坐标系不一样
      // const position = viewer.scene.camera.position //cartesian3 空间直角坐标系
      // const ellipsoid = scene.globe.ellipsoid;
      // const position =ellipsoid.cartesianToCartographic(viewer.scene.camera.position)
      // 弧度转经纬度
      const lon = Math.toDegrees(position.longitude).toFixed(6)
      const lat = Math.toDegrees(position.latitude).toFixed(6)
      const height = position.height
      return { lon, lat, height, mat: info }
    }
  }

  /**
   * @param target 目标对象
   * @param options 配置项
   *设置相机位置
   *  */
  viewerFlyTo(
    target:
      | Entity
      | Entity[]
      | EntityCollection
      | DataSource
      | ImageryLayer
      | Cesium3DTileset
      | TimeDynamicPointCloud
      | Promise<
          | Entity
          | Entity[]
          | EntityCollection
          | DataSource
          | ImageryLayer
          | Cesium3DTileset
          | TimeDynamicPointCloud
          | VoxelPrimitive
        >,
    options: {
      duration?: number
      maximumHeight?: number
      offset?: HeadingPitchRange
    }
  ) {
    if (this.viewer) {
      this.viewer.flyTo(target, options)
    }
  }

  /**
   * setView2D
   * */
  setView2D(num?: number) {
    this.viewer?.scene.morphTo2D(num)
    // this.viewer.scene.mode = SceneMode.SCENE2D
    console.log('the viewer is 2d')
  }

  /**
   * setView2.5D
   * */
  setViewToColumbus(num?: number) {
    this.viewer?.scene.morphToColumbusView(num)
    // this.viewer.scene.mode = SceneMode.SCENE2D
    console.log('the viewer is 2d')
  }
  /**
   * setView2D
   * */
  setView3D(num?: number) {
    this.viewer?.scene.morphTo3D(num)
    // this.viewer.scene.mode = SceneMode.SCENE3D
    console.log('the viewer is 3d')
  }

  /**
   * @param entity  Entity | Entity.ConstructorOptions
   * @return 返回创建的entity
   * 这里可以创建点、线、面、文字、图标、模型
   * */
  addEntity(entity: Entity | Entity.ConstructorOptions) {
    if (this.viewer && entity.id) {
      if (this.cesiumEntitiesCollection.has(entity.id)) {
        console.log('以创建过相同id的实体')
        return false
      }
      const target = this.viewer.entities.add(entity)
      this.cesiumEntitiesCollection.set(entity.id, target)
      return target
    } else {
      console.log('id必须创立')
    }
  }

  getEntityById(id: any) {
    if (this.viewer) {
      const Entity = this.viewer.entities.getById(id)
      return Entity
    }
  }

  removeEntityById(id: any) {
    if (this.viewer) {
      this.viewer.entities.removeById(id)
      this.cesiumEntitiesCollection.delete(id)
    }
  }

  removeEntityByEntity(target: Entity) {
    if (this.viewer) {
      this.viewer.entities.remove(target)
    }
  }

  removeAllEntities() {
    if (this.viewer) {
      this.viewer.entities.removeAll()
    }
  }

  // 用不到，可以看看·
  getEntityProtype() {
    let entity: any = null
    if (this.viewer) {
      const Viewer = this.viewer
      const handler = new ScreenSpaceEventHandler(Viewer.scene.canvas)
      handler.setInputAction((event: any) => {
        const pick = Viewer.scene.pick(event.position)

        // 如果定义了 pick就是证明获取到了entity
        if (defined(pick)) {
          // console.log(pick.id)
          entity = pick
        }
      }, ScreenSpaceEventType.LEFT_CLICK)
    }
    console.log(entity)

    return entity
  }

  // 绑定屏幕空间事件
  setScreenSpaceEventHandler(Fn: any, type: ScreenSpaceEventType) {
    if (this.viewer) {
      const Viewer = this.viewer
      this.screenSpaceEventHandler = new ScreenSpaceEventHandler(Viewer.scene.canvas)
      this.screenSpaceEventHandler.setInputAction(Fn, type)
    }
  }

  // 移除屏幕空间事件
  removeScreenSpaceEventHandler(type: ScreenSpaceEventType) {
    if (this.screenSpaceEventHandler) {
      this.screenSpaceEventHandler.removeInputAction(type)
    }
  }

  // 引入geojson文件
  addGeoJsonDataSource(url: string) {
    const geojsonData = GeoJsonDataSource.load(url, {
      // clampToGround: true,
      stroke: Color.RED,
      fill: Color.WHITE.withAlpha(0),
      strokeWidth: 3
    })
    return geojsonData
  }

  addDataSource(dataSource: DataSource | Promise<DataSource>) {
    if (this.viewer) {
      const source = this.viewer.dataSources.add(dataSource)
      return source
    }
  }

  async addArcGisMapServerImageryProvider(url: string) {
    if (this.viewer) {
      const arcgisImage = await ArcGisMapServerImageryProvider.fromUrl(url)
      const imageLayer = this.viewer.imageryLayers.addImageryProvider(arcgisImage)
      return imageLayer
    }
  }

  removeImageLayer(layer: ImageryLayer) {
    if (this.viewer) {
      this.viewer.imageryLayers.remove(layer)
    }
  }

  /**
   * @param fn 方法
   * @return callback Function
   * 相机位置改变触发
   **/
  cameraChanged(fn: Function) {
    if (this.viewer) {
      const changed = this.viewer.scene.camera.changed.addEventListener(fn())
      return changed
    }
  }

  /**
   * @param fn 方法
   * @return callback Function
   * 相机位置开始改变触发
   *  */
  cameraMoveStart(fn: Function) {
    if (this.viewer) {
      const startChanged = this.viewer.scene.camera.changed.addEventListener(fn())
      return startChanged
    }
  }

  /**
   * @param fn 方法
   * @return callback Function
   * 相机位置结束改变触发
   *  */
  cameraMoveEnd(fn: Function) {
    if (this.viewer) {
      const removeChanged = this.viewer.scene.camera.moveEnd.addEventListener(fn())
      return removeChanged
    }
  }

  // 利用对象注册一个事件
  registerEvents(type: string, callback: Function) {
    if (!callback || typeof callback !== 'function') return

    let eventType: any = null
    switch (type) {
      case 'LEFT_DOWN':
        eventType = ScreenSpaceEventType.LEFT_DOWN
        break
      case 'LEFT_UP':
        eventType = ScreenSpaceEventType.LEFT_UP
        break
      case 'LEFT_CLICK':
        eventType = ScreenSpaceEventType.LEFT_CLICK
        break
      case 'LEFT_DOUBLE_CLICK':
        eventType = ScreenSpaceEventType.LEFT_DOUBLE_CLICK
        break
      case 'RIGHT_DOWN':
        eventType = ScreenSpaceEventType.RIGHT_DOWN
        break
      case 'RIGHT_UP':
        eventType = ScreenSpaceEventType.RIGHT_UP
        break
      case 'RIGHT_CLICK':
        eventType = ScreenSpaceEventType.RIGHT_CLICK
        break
      case 'MIDDLE_DOWN':
        eventType = ScreenSpaceEventType.MIDDLE_DOWN
        break
      case 'MIDDLE_UP':
        eventType = ScreenSpaceEventType.MIDDLE_UP
        break
      case 'MIDDLE_CLICK':
        eventType = ScreenSpaceEventType.MIDDLE_CLICK
        break
      case 'MOUSE_MOVE':
        eventType = ScreenSpaceEventType.MOUSE_MOVE
        break
      case 'WHEEL':
        eventType = ScreenSpaceEventType.WHEEL
        break
      case 'PINCH_START':
        eventType = ScreenSpaceEventType.PINCH_START
        break
      case 'PINCH_END':
        eventType = ScreenSpaceEventType.PINCH_END
        break
      case 'PINCH_MOVE':
        eventType = ScreenSpaceEventType.PINCH_MOVE
        break
      default:
        eventType = null
    }
    if (!eventType) return

    const id = Guid()
    this.cesiumEventActionType.set(id, eventType)

    if (this.cesiumEventAction.has(eventType)) {
      this.cesiumEventAction.get(eventType).set(id, callback)
    } else {
      // 注册cesiums事件
      this.cesiumEventAction.set(eventType, new Map())
      this.cesiumEventAction.get(eventType).set(id, callback)

      //item 就是整个callback
      this.cesiumEventAction.get(eventType).forEach((item: any) => {
        setTimeout(() => {
          item()
        }, 0)
      })

      // if (this.viewer) {
      //   const Viewer = this.viewer
      //   const handler = Viewer.screenSpaceEventHandler
      //   handler.setInputAction((event: any) => {
      //     const pickedObject = Viewer.scene.pick(event.position)
      //     const cartographic = Cartographic.fromCartesian(Viewer.scene.pickPosition(event.position))
      //     const lng = Math.toDegrees(cartographic.longitude) //经度值
      //     const lat = Math.toDegrees(cartographic.latitude) //纬度值

      //     //item 就是整个callback
      //     this.cesiumEventAction.get(eventType).forEach((item: any) => {
      //       setTimeout(() => {
      //         // {
      //         //   event: event,
      //         //   pickedObject: pickedObject,
      //         //   coordinate: { lng: lng, lat: lat, alt: cartographic.height }
      //         // }
      //         item()
      //       }, 0)
      //     })
      //   }, eventType)
      // }
    }
    return id
  }

  // 移除注册事件
  removeEvents(eventId: string) {
    if (this.cesiumEventActionType.has(eventId)) {
      const eventType = this.cesiumEventActionType.get(eventId)
      if (this.cesiumEventAction.has(eventType)) {
        this.cesiumEventAction.get(eventType).delete(eventId)
      }
      if (this.cesiumEventAction.get(eventType).size === 0 && this.viewer) {
        this.cesiumEventAction.delete(eventType)
        const handler = this.viewer.screenSpaceEventHandler
        handler.removeInputAction(eventType)
      }
      this.cesiumEventActionType.delete(eventId)
    }
  }

  // 全局方法 用于鼠标触碰时候改变鼠标样式
  changeMouseStyleWhileGetEntity() {
    // window.addEventListener('mousemove', (event: any) => {
    //   // 获取鼠标在Cesium Viewer中的坐标
    //   const mousePosition = new Cartesian2(event.clientX, event.clientY)
    //   // 使用pick 方法获取当前鼠标位置下的实体对象
    //   if (this.viewer) {
    //     const Viewer = this.viewer
    //     // const pickRay = Viewer.camera.getPickRay(mousePosition)!
    //     // const cartesian = Viewer.scene.globe.pick(pickRay, Viewer.scene)!
    //     const cartesian = Viewer.scene.pickPosition(mousePosition)
    //     // console.log(cartesian)
    //     const pickedEntity = Viewer.scene.pick(cartesian)
    //     // console.log(pickedEntity)
    //     if (defined(pickedEntity) && defined(pickedEntity.id)) {
    //       console.log('change')
    //       // 实体存在 鼠标样式改变成 pointer
    //       Viewer.canvas.style.cursor = 'pointer'
    //     } else {
    //       console.log('failed')
    //       Viewer.canvas.style.cursor = 'default'
    //     }
    //   }
    // })
    if (this.viewer) {
      const viewer = this.viewer
      const handler = viewer.screenSpaceEventHandler
      handler.setInputAction((e: any) => {
        const mousePosition = e.endPosition

        const pickedEntity = viewer.scene.pick(mousePosition)

        if (defined(pickedEntity)) {
          viewer.canvas.style.cursor = 'pointer'
        } else {
          viewer.canvas.style.cursor = 'default'
        }
      }, ScreenSpaceEventType.MOUSE_MOVE)
    }
  }

  /**
   *@param target boolean
   * 设置为true的话，场景里可以旋转，拖拽等。设置为false将禁用所有鼠标的输入事件
   * */
  enableInputs(target: boolean) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.enableInputs = target
  }

  /**
   *@param target boolean
   *是否可以拖动地图,只在2d和2.5d场景里生效
   *  */
  enableTranslate(target: boolean) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.enableTranslate = target
  }

  /**
   *@param target boolean
   * 是否可以缩放
   * */
  enableZoom(target: boolean) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.enableZoom = target
  }

  /**
   *@param target boolean
   * 是否可以旋转地图,只在2d和2.5d场景里生效
   * */
  enableRotate(target: boolean) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.enableRotate = target
  }
  /**
   *@param target boolean
   * 是否可以倾斜地图,只在3d和2.5d场景生效
   * */
  enableTilt(target: boolean) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.enableTilt = target
  }

  /**
   *@param target boolean
   * 是否允许使用自由外观,只改变相机的朝向，不改变相机位置 默认为true
   * 这个相机位置并不锁定
   * */
  enableLook(target: boolean) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.enableLook = target
  }

  /**
   *@param target number
   * 旋转惯性
   * */
  inertiaSpin(target: number) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.inertiaSpin = target
  }

  /**
   *@param target number
   * 平移惯性
   * */
  inertiaTranslate(target: number) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.inertiaTranslate = target
  }

  /**
   *@param target number
   * 缩放惯性
   * */
  inertiaZoom(target: number) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.inertiaZoom = target
  }

  /**
   *@param target number
   * 切换2d,2.5d，3d模式之间的时间间隔，默认3s
   * */
  bounceAnimationTime(target: number) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.bounceAnimationTime = target
  }

  /**
   *@param target number
   * 相机离地表的最低高度，默认1米，比如设置为-100米的情况下相机将钻入地下
   * */
  minimumZoomDistance(target: number) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = target
  }

  /**
   *@param target number
   * 相机离地表的最大高度，默认为无穷大
   * */
  maximumZoomDistance(target: number) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = target
  }

  /**
   *@param target any
   * 移动场景的事件，默认是鼠标按住左键拖拽地图,可自定义移动场景的鼠标事件，2d和2.5d有效
   * */
  translateEventTypes(target: any) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.translateEventTypes = target
  }

  /**
   *@param target any
   *鼠标缩放事件，传入的是一个数组,默认鼠标右键拖拽，鼠标滚轮滚动，两个手指滚动笔记本触控区都可以触发场景缩放效果
   *  */
  zoomEventTypes(target: any) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.zoomEventTypes = target
  }

  /**
   *@param target any
   *旋转场景，默认是左键拖拽，只在2.5d和3d场景生效
   *  */
  rotateEventTypes(target: any) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.rotateEventTypes = target
  }

  /**
   *@param target any
   * 场景倾斜事件，默认是鼠标滚轮下按拖拽，按CTRL+左键拖拽，按CTRL+右键拖拽都可以使场景倾斜，建议将场景倾斜改成右键拖拽使用起来更方便一点
   * */
  tileEventTypes(target: any) {
    if (this.viewer) {
      this.viewer.scene.screenSpaceCameraController.tiltEventTypes = target
    }
  }

  /**
   *@param target any
   * 相机位置不变，改变相机方向进行自由观看，默认是按住SHIFTT键+左键拖拽
   * */
  lookEventTypes(target: any) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.lookEventTypes = target
  }

  /**
   *@param target boolean
   * 是否开启碰撞检测，默认是开启
   * */
  enableCollisionDetection(target: boolean) {
    if (this.viewer) this.viewer.scene.screenSpaceCameraController.enableCollisionDetection = target
  }
}

export default CesiumClass
