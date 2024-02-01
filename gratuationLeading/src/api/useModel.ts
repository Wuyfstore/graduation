import model from '@/utils/three/model.js'
import { Trangualte } from '@/utils/three/triangulate'
import { Tool } from '@/utils/three/tool.js'
import { getAllDatas } from '@/server/https'

export const init = async (dom: Element, path: string, data: any) => {
  model.init(dom, false)
  await model.readJsonBound(path)
  // model.drawCylinder(data)
  model.drawChildCylinder(data)
  model.measureBox()
  model.setLight()
  model.setCamera()
  model.renderAction()
  model.getTarObject(data)

  // const trans = await getAllDatas('/three')
  // const trangulate = trans.trangulate
  // for (const arrs of trangulate[0]) {
  //   for (const arr of arrs) {
  //     model.stateLineLoop(arr)
  //   }
  // }
  // for (const arrs of trangulate[0]) {
  //   model.stateLineLoop(arrs)
  // }
}
