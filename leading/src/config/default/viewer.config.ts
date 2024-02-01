import {
  Clock,
  SceneMode,
  ShadowMode,
  ImageryLayer,
  TileMapServiceImageryProvider,
  createWorldTerrainAsync
} from 'cesium'

const imageryLayerUrl = 'libs/cesium/Assets/Textures/NaturalEarthII'
const imageryLayer = await TileMapServiceImageryProvider.fromUrl(imageryLayerUrl, {})

/**
 * @description 导出默认Cesium view配置
 */
const viewerConfig = {
  currentProjection: '', //当前坐标系
  offentProjections: [], //常用坐标系集，
  Ellipsoid: [], //椭球半径
  cesiumViewConfig: {
    //影像底图 1.104写法
    // imageryProvider: new TileMapServiceImageryProvider({
    //   url: 'libs/cesium/Assets/Textures/NaturalEarthII'
    // }),

    //影像地底图 1.107写法  移除了imageryProvider，用baselayer代替
    baseLayer: new ImageryLayer(imageryLayer, {}),
    //添加地形
    // terrainProvider: await createWorldTerrainAsync({
    //   requestVertexNormals: true,
    //   requestWaterMask: true
    // }),
    animation: false, //是否开启动画
    baseLayerPicker: false, // 底图选择框是否显示
    sceneModePicker: false, //隐藏切换二三维按钮
    fullscreenButton: false, //隐藏全屏按钮
    homeButton: false, //隐藏home按钮
    //requestRenderMode: true, //启用请求渲染模式 这个注释不要取消
    useBrowserRecommendedResolution: false, // 是否选择浏览器推荐分辨率
    maximumRenderTimeChange: Infinity, // 无操作时自动渲染帧率，设为数字会消耗性能，Infinity为无操作不渲染
    navigationHelpButton: false, // 导航帮助按钮是否显示
    scene3DOnly: true, // 是否只使用3d渲染（为true时可优化性能）
    selectionIndicator: false, // 是否显示选取指示器组件
    shouldAnimate: false, // 自动播放动画控件
    shadows: false, // 是否显示光照投射的阴影
    geocoder: false, //隐藏搜索按钮
    navigationInstructionsInitiallyVisible: false,
    infoBox: false, // 是否显示图形的信息
    timeline: false, //隐藏时间轴
    creditContainer: document.createElement('div'), //隐藏logo
    msaaSamples: 2,
    depthPlaneEllipsoidOffset: 5,
    targetFrameRate: 120, // 帧率
    maximumScreenSpaceError: 64, //屏幕空间最大误差
    terrainShadows: ShadowMode.DISABLED, // 地质接收阴影
    sceneMode: SceneMode.SCENE3D,
    clock: new Clock(), //时钟
    resolutionScale: 1, //清晰度 0-1
    // skyBox: false,
    // // skyAtmosphere: false,// 关闭天空盒会一同关闭太阳，场景会变暗
    navigation: false,
    contextOptions: {
      requestWebgl2: false,
      webgl: {
        preserveDrawingBuffer: true // 实现canvas缓存获得canvas图像内容
      }
    }
  },
  // viewLimitExtent: [73.0487252951578, 21.401492581042618, 129.5342516190571, 49.50698540760487], // 全国
  viewLimitExtent: [118.028279, 27.041356, 122.949508, 31.178782],
  viewInitExtent: [118.55292539673098, 29.368247692306298, 119.239466542228, 29.856795844339103] // 水库
}

export default viewerConfig
