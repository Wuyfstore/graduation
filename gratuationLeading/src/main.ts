import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'

// element中部分无法自动引入的样式
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message-box.css'

import App from './App.vue'
import router from './router'
import CesiumClass from '@/utils/cesium'
import resFostSize from '@/global/resFontSize'
import registIcons from '@/global/registIcons'
import registCesium from '@/global/registCesium'
import pinia from '@/global/registPinia'

// 声明一个Window
declare global {
  interface Window {
    CESIUM_BASE_URL: string
    Cesium: CesiumClass
  }
}
const app = createApp(App)

app.use(registCesium)
app.use(resFostSize)
app.use(registIcons)

app.use(pinia)
app.use(router)

app.mount('#app')
