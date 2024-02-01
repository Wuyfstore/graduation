import type { App } from 'vue'
import { setDomFontSize } from '@/utils/pxtorem'

const resFostSize = (app: App<Element>) => {
  setDomFontSize()
}

export default resFostSize
