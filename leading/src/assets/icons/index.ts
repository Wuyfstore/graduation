import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'
import SvgIcon from '@/components/common/svgIcon/index.vue'

// 读取assets/icons/svg中所有的svg文件,   eager是否立即加载所有的文件
const svgDirs = import.meta.glob('@/assets/icons/svg/**/*.svg', { eager: true })

export default (app: App<Element>) => {
  console.log(svgDirs)
  //全局注册 svg-icon 组件
  app.component('Svg-icon', SvgIcon)
}
