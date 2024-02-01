import type { App } from 'vue'
import CesiumClass from '@/utils/cesium'

const registCesium = (app: App<Element>) => {
  window.Cesium = new CesiumClass()
}

export default registCesium
