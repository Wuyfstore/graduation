<template>
  <div class="baseHoleInfo">
    <div>钻孔信息</div>
    <el-scrollbar class="scrollable-form">
      <el-form :model="tarRockList" size="small" label-position="right" label-width="100px">
        <!-- <template v-for="(value, key) in holeForm" :key="key">
          <el-form-item :label="key + ''">
            <el-input v-model="holeForm[key]"></el-input>
          </el-form-item>
        </template> -->
        <el-form-item label="钻孔统一编号">
          <el-input v-model="tarRockList.label" />
          <!-- <div class="el-form-itm-div">{{ holeForm.label ? holeForm.label : '空' }}</div> -->
        </el-form-item>
        <el-form-item label="钻孔原始编号">
          <el-input v-model="tarRockList.OriginalHoleNumber" />
          <!-- <div class="el-form-itm-div">
            {{ holeForm.OriginalHoleNumber ? holeForm.OriginalHoleNumber : '空' }}
          </div> -->
        </el-form-item>
        <el-form-item label="工程编号">
          <el-input v-model="tarRockList.jobNumber" />
          <!-- <div class="el-form-itm-div">{{ holeForm.jobNumber ? holeForm.jobNumber : '空' }}</div> -->
        </el-form-item>
        <el-form-item label="工程名称">
          <el-input v-model="tarRockList.jobName" />
          <!-- <div class="el-form-itm-div">{{ holeForm.jobName ? holeForm.jobName : '空' }}</div> -->
        </el-form-item>
        <el-form-item label="钻孔类型">
          <el-input v-model="tarRockList.holetype" />
          <!-- <div class="el-form-itm-div">{{ holeForm.holetype ? holeForm.holetype : '空' }}</div> -->
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="tarRockList.lon" />
          <!-- <div class="el-form-itm-div">{{ holeForm.lon ? holeForm.lon : '空' }}</div> -->
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="tarRockList.lat" />
          <!-- <div>{{ holeForm.lat ? holeForm.lat : '空' }}</div> -->
        </el-form-item>
        <el-form-item label="公厘网坐标X(m)">
          <el-input v-model="tarRockList.MmGirdCoordX" />
          <!-- <div class="el-form-itm-div">
            {{ holeForm.MmGirdCoordX ? holeForm.MmGirdCoordX : '空' }}
          </div> -->
        </el-form-item>
        <el-form-item label="公厘网坐标Y(m)">
          <el-input v-model="tarRockList.MmGirdCoordY" />
          <!-- <div class="el-form-itm-div">
            {{ holeForm.MmGirdCoordY ? holeForm.MmGirdCoordY : '空' }}
          </div> -->
        </el-form-item>
        <el-form-item label="地面标高(m)">
          <el-input v-model="tarRockList.groundElevation" />
          <!-- <div class="el-form-itm-div">
            {{ holeForm.groundElevation ? holeForm.groundElevation : '空' }}
          </div> -->
        </el-form-item>
        <el-form-item label="钻孔深度(m)">
          <el-input v-model="tarRockList.drillingDepth" />
          <!-- <div class="el-form-itm-div">
            {{ holeForm.drillingDepth ? holeForm.drillingDepth : '空' }}
          </div> -->
        </el-form-item>
        <el-form-item label="稳定水位(m)">
          <el-input v-model="tarRockList.FixedLevel" />
          <!-- <div class="el-form-itm-div">{{ holeForm.FixedLevel ? holeForm.FixedLevel : '空' }}</div> -->
        </el-form-item>
        <el-form-item label="施工单位">
          <el-input v-model="tarRockList.ConstructionOrginization" />
          <!-- <div class="el-form-itm-div">
            {{ holeForm.ConstructionOrginization ? holeForm.ConstructionOrginization : '空' }}
          </div> -->
        </el-form-item>
        <el-form-item label="施工日期">
          <el-input v-model="tarRockList.CommencementDate" />
          <!-- <div class="el-form-itm-div">
            {{ holeForm.CommencementDate ? holeForm.CommencementDate : '空' }}
          </div> -->
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { defined, ScreenSpaceEventType } from 'cesium'
import useHoleStore from '@/stores/holeStore'
import useCesiumStore from '@/stores/cesiumStore'

const holeStore = useHoleStore()
const cesiumStore = useCesiumStore()

const { tarRockList } = storeToRefs(holeStore)
const { defaultPointId } = storeToRefs(cesiumStore)
const registerListenerId = ref<string | undefined>('')

// 获取对应id的数据
const getData = async () => {
  // 成功后对holeStore中的数据进行初始化
  await holeStore.getTarHistogramData(defaultPointId.value)
  // 对象合并
  // Object.assign(holeForm, data)
}

const getOtherData = async () => {
  await holeStore.getrockListData(defaultPointId.value)
}

// 新建一个监听 整体还能简化 之后再讲
const setGetEntityListener = () => {
  registerListenerId.value = window.Cesium.registerEvents('LEFT_CLICK', () => {
    if (window.Cesium.viewer) {
      const Viewer = window.Cesium.viewer
      const handler = Viewer.screenSpaceEventHandler
      handler.setInputAction((event: any) => {
        const pickedObject = Viewer.scene.pick(event.position)
        if (defined(pickedObject) && typeof pickedObject.id.id === 'number') {
          cesiumStore.saveClickEntityId(pickedObject.id.id)
          getData()
          getOtherData()
        }
      }, ScreenSpaceEventType.LEFT_CLICK)
    }
  })
}

//移除监听
const removeListener = () => {
  if (registerListenerId.value) window.Cesium.removeEvents(registerListenerId.value)
}

onMounted(() => {
  setGetEntityListener()
  getData()
})

// watch(defaultPointId, () => {
//   getData()
// })

onUnmounted(() => {
  removeListener()
})
</script>

<style lang="less" scoped>
.baseHoleInfo {
  top: 35%;
  left: 1%;
  padding: 0.5% 0;
  width: 18%;
  height: 60%;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.42),
      rgba(255, 255, 255, 0)
    )
    1 1;
  backdrop-filter: blur(10px);
  pointer-events: auto;
}

:deep(.el-form) {
  .el-form-item {
    .el-form-item__label {
      color: black;
    }
  }
}

.scrollable-form {
  padding: 1% 2%;
  max-height: calc(100% - 30px); /* 调整表单的最大高度，留出上下边距 */
  overflow-y: auto; /* 添加纵向滚动条 */
}

// .el-form-itm-div {
//   border: 1px solid rgba(255, 255, 255, 0.42);
//   min-width: 50px;
// }
</style>
@/server/https
