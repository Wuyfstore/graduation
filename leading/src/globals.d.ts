import { Viewer } from 'cesium'

declare global {
  interface Window {
    appConfig: {
      baseUrl: string
    }
    CESIUM_BASE_URL: string
    viewer: Viewer
  }
}
