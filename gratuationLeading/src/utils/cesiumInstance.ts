import CesiumClass from '@/utils/cesium' //没有用上

let cesiumInstance: CesiumClass | null = null

export const getCesiumInstance = () => {
  if (!cesiumInstance) {
    cesiumInstance = new CesiumClass()
  }
  return cesiumInstance
}
