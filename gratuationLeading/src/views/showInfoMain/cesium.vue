<template>
  <div id="cesium-viewer" ref="cesiumRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import useCesiumStore from '@/stores/cesiumStore'
import useHoleStore from '@/stores/holeStore'
import { SceneMode, Cartesian3, EasingFunction, CameraEventType } from 'cesium'

const cesiumRef = ref<HTMLDivElement>()
const cesiumStore = useCesiumStore()
const holeStore = useHoleStore()
window.CESIUM_BASE_URL = 'node_modules/cesium/Build/CesiumUnminified/'

const setViewer = () => {
  if (cesiumRef.value) {
    window.Cesium.setViewer(cesiumRef.value as HTMLElement, {
      // 实现canvas缓存获得canvas图像内容
      contextOptions: {
        webgl: { preserveDrawingBuffer: true }
      },
      sceneMode: SceneMode.SCENE3D
    })
  }
}

const complete = () => {
  // Cesium.setViewToColumbus(0)
  window.Cesium.tileEventTypes(CameraEventType.RIGHT_DRAG)
  // 添加json数据，如果使用下面的arcgis服务，这里就不用
  window.Cesium.addDataSource(window.Cesium.addGeoJsonDataSource('/MapData/NTData.json'))
  // 利用arcgis server发布的服务
  // window.Cesium.addArcGisMapServerImageryProvider(
  //   'http://localhost:6080/arcgis/rest/services/Nt/NanTong/MapServer?f=pjson'
  // )
  window.Cesium.setSkyBox({
    sources: {
      positiveX: '/skyImg/px.png',
      negativeX: '/skyImg/nx.png',
      positiveY: '/skyImg/ny.png',
      negativeY: '/skyImg/py.png',
      positiveZ: '/skyImg/pz.png',
      negativeZ: '/skyImg/nz.png'
    }
  })
}

const flyToNt = async () => {
  const flyToNtExecuted = cesiumStore.isFlyTo
  const destination = Cartesian3.fromDegrees(120.940603, 31.586377, 65480.63709090521)
  const heading = 6.266561177733244
  const pitch = -1.0043165005700132
  const roll = 6.283167541864056
  if (flyToNtExecuted && window.Cesium.viewer) {
    window.Cesium.cameraFlyTo({
      destination,
      orientation: {
        heading,
        pitch,
        roll
      },
      easingFunction: EasingFunction.BACK_IN,
      complete: complete
    })
    cesiumStore.changeIsFlyTo()
  } else {
    window.Cesium.viewer?.camera.setView({
      destination,
      orientation: {
        heading,
        pitch,
        roll
      }
    })
    complete()
  }
}
onMounted(() => {
  setViewer()
  flyToNt()
  window.Cesium.changeMouseStyleWhileGetEntity()
  holeStore.getHistogramData()
})
</script>

<style lang="less" scoped>
#cesium-viewer {
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
