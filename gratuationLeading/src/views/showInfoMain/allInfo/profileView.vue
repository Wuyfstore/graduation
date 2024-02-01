<template>
  <div class="profileView">
    <div class="switch">
      <div class="switch-item">
        <p>剖面图</p>
        <el-switch
          v-model="isDraw"
          @change="closeSwitch"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        />
      </div>
    </div>
    <teleport to="body">
      <el-dialog v-model="visible" :title="titleName" @close="closeDialog" width="1000" center>
        <template #default>
          <canvas id="canvas" ref="canvasDom" width="1000" height="600" resize></canvas>
        </template>
      </el-dialog>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import useHoleStore from '@/stores/holeStore'
import { DrawStratigraphicMap } from '@/utils/drawStratigraphicMap'
import { ScreenSpaceEventType } from 'cesium'
import type { HTType } from '@/types/Props'

const holeStore = useHoleStore()
const { rockList } = storeToRefs(holeStore)

let stratigraphicMap: DrawStratigraphicMap | null
let holeList: Array<HTType> = []
let listenerId: any

const isDraw = ref<boolean>(false)
const visible = ref<boolean>(false)
const canvasDom = ref<HTMLCanvasElement>()
const titleName = ref<string>('')

const setRightClickListener = () => {
  listenerId = window.Cesium.registerEvents('RIGHT_CLICK', () => {
    if (window.Cesium.viewer) {
      const Viewer = window.Cesium.viewer
      const handler = Viewer.screenSpaceEventHandler
      handler.setInputAction(() => {
        // 过滤掉初始的空对象
        const tempArray = holeList.filter((item) => Object.keys(item).length !== 0)
        // console.log(tempArray)
        // 设置标题
        const t1 = tempArray[0].label
        const t2 = tempArray[tempArray.length - 1].label
        titleName.value = `${t1}-${t2}钻孔地质剖面图`
        // 启动弹窗
        visible.value = true
        nextTick(() => {
          if (window.Cesium.viewer && canvasDom.value) {
            stratigraphicMap = new DrawStratigraphicMap(window.Cesium.viewer, canvasDom.value)
            // 将
            stratigraphicMap.holePoints = tempArray
            stratigraphicMap.drawAll()
            holeList = []
            stratigraphicMap.holePoints = []
          }
        })
      }, ScreenSpaceEventType.RIGHT_CLICK)
    }
  })
}

//switch关闭时执行
const closeSwitch = () => {
  if (isDraw.value === false) {
    stratigraphicMap = null
    window.Cesium.removeEvents(listenerId)
  }
}

//dialog关闭时执行
const closeDialog = () => {
  if (canvasDom.value) {
    const ctx = canvasDom.value.getContext('2d')
    //清除所有绘制的内容
    ctx?.clearRect(0, 0, canvasDom.value.width, canvasDom.value.height)
  }
}

// 监听
watch([isDraw, rockList], () => {
  // 当启动绘制后执行
  if (isDraw.value === true) {
    holeList.push(rockList.value)
    setRightClickListener()
  } else {
    if (listenerId) {
      window.Cesium.removeEvents(listenerId)
      holeList = []
    }
  }
})
</script>

<style lang="less" scoped>
.profileView {
  .switch {
    display: flex;
    justify-content: space-around;
    margin-top: 5%;

    .switch-item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: small;

      .el-switch {
        padding-left: 10px;
      }
    }
  }
}

#canvas {
  image-rendering: auto;
}

:global(.el-dialog__body) {
  padding: 0 !important;
}
</style>
