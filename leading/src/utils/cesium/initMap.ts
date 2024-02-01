import {
  Ion,
  Viewer,
  Cartesian3,
  EasingFunction,
  CameraEventType,
  GeoJsonDataSource,
  Color,
  SkyBox,
  IonImageryProvider,
  ScreenSpaceEventType
} from 'cesium'

const destination = Cartesian3.fromDegrees(120.940603, 31.586377, 65480.63709090521)
const heading = 6.266561177733244
const pitch = -1.0043165005700132
const roll = 6.283167541864056
const geojsonLayerUrl = '/MapData/NTData.json'

const initMap = async (token: string, ele: HTMLDivElement, viewerOptions: object) => {
  Ion.defaultAccessToken = token

  window.CESIUM_BASE_URL = 'libs/cesium'

  try {
    window.viewer = new Viewer(ele, viewerOptions)
    //添加高清影像地图
    window.viewer.imageryLayers.addImageryProvider(await IonImageryProvider.fromAssetId(2, {}))
    window.viewer.scene.debugShowFramesPerSecond = false //显示帧率
    window.viewer.scene.globe.terrainExaggeration = 1.5 //地形夸张
  } catch (error) {
    console.log('error', error)
    console.warn(error)
  }
}

const viewFlyToNT = async () => {
  window.viewer &&
    window.viewer.camera.flyTo({
      destination,
      orientation: { heading, pitch, roll },
      easingFunction: EasingFunction.BACK_IN,
      complete
    })
}

const complete = () => {
  //将拖拽事件改为右键
  window.viewer &&
    (window.viewer.scene.screenSpaceCameraController.tiltEventTypes = CameraEventType.RIGHT_DRAG)
  // 添加json数据，如果使用下面的arcgis服务，这里就不用
  const geojsonLayer = GeoJsonDataSource.load(geojsonLayerUrl, {
    stroke: Color.RED,
    fill: Color.WHEAT.withAlpha(0),
    strokeWidth: 5
  })
  window.viewer.dataSources.add(geojsonLayer)

  //设置天空盒子
  window.viewer.scene.skyBox = new SkyBox({
    sources: {
      positiveX: new URL('../../assets/img/sky/px.png', import.meta.url).href,
      negativeX: new URL('../../assets/img/sky/nx.png', import.meta.url).href,
      positiveY: new URL('../../assets/img/sky/py.png', import.meta.url).href,
      negativeY: new URL('../../assets/img/sky/ny.png', import.meta.url).href,
      positiveZ: new URL('../../assets/img/sky/pz.png', import.meta.url).href,
      negativeZ: new URL('../../assets/img/sky/nz.png', import.meta.url).href
    }
  })

  //用于取消entity被双击后，剧中显示并锁定相机，只能放大与视角旋转
  window.viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
  window.viewer.trackedEntity = undefined
}

export { initMap, viewFlyToNT }
