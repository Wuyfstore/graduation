import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'

function registIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // 注册全局组件
    app.component(key, component)
  }
}

export default registIcons
