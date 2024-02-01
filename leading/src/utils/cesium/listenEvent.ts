import { ScreenSpaceEventHandler, defined, ScreenSpaceEventType } from 'cesium'
import state from '@/state'

let linster: ScreenSpaceEventHandler | null = null

/**
 * @description 此方法用于全局监听鼠标触碰到实体后改变鼠标样式 具有一个自定义回调参数
 * @param {callback} fn
 */
const changeMouse = (fn?: () => void) => {
  const handler = window.viewer.screenSpaceEventHandler
  handler.setInputAction((e: any) => {
    const mousePosition = e.endPosition

    const pickedEntiy = window.viewer.scene.pick(mousePosition)
    // console.log('pickedEntiy', pickedEntiy)

    if (defined(pickedEntiy)) window.viewer.canvas.style.cursor = 'pointer'
    else window.viewer.canvas.style.cursor = 'default'

    fn && fn()
  }, ScreenSpaceEventType.MOUSE_MOVE)
}

let lastHighLightEntity: any = null //放大的实体
/**
 * @description
 * @param {callback} fn
 */
const leftClickListener = (fn?: (id: number) => void) => {
  linster = window.viewer.screenSpaceEventHandler
  linster.setInputAction((e: any) => {
    const pickedEntiy = window.viewer.scene.pick(e.position)

    if (defined(pickedEntiy)) {
      //高亮处理
      if (lastHighLightEntity) {
        lastHighLightEntity._billboard._scale._value = 1
      }
      // console.log(pickedEntiy.id)

      pickedEntiy.id._billboard._scale._value = 1.5
      lastHighLightEntity = pickedEntiy.id
      //将点击的entity的id赋值给clickedEntityId
      state.clickedEntityId = pickedEntiy.id._id
    } else if (lastHighLightEntity) {
      lastHighLightEntity._billboard._scale._value = 1
      lastHighLightEntity = null
    }
    fn && fn(Number(pickedEntiy.id._id))
  }, ScreenSpaceEventType.LEFT_CLICK)
}

/**
 * @description 移除某种类型的监听事件
 * @param {ScreenSpaceEventType} type
 */
const removeListener = (type: ScreenSpaceEventType) => {
  linster && linster.removeInputAction(type)
}

export { changeMouse, leftClickListener, removeListener }
