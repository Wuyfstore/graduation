<template>
  <div class="table">
    <el-table :data="tarRockList.items" style="width: 100%" :max-height="maxheight" size="small" border>
      <el-table-column label="层号" align="center" width="35" prop="formationId" />
      <el-table-column label="层底标高(m)" align="center" prop="elevation" />
      <el-table-column label="层底深度(m)" align="center" prop="buriedDeep" />
      <el-table-column label="分层厚度(m)" align="center" prop="thickness" />
      <el-table-column label="标识" align="center" prop="histogramTypeColor" width="50">
        <template #default="{ row }">
          <div class="color-block" :style="{ backgroundColor: row.histogramTypeColor }"></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref,onMounted,nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import useHoleStore from '@/stores/holeStore'

const holeStore = useHoleStore()
const { tarRockList } = storeToRefs(holeStore)

const maxheight = ref(0)

onMounted(()=>{
  // console.log(window.innerHeight);
  nextTick(()=>{
    maxheight.value = window.innerHeight - window.innerHeight*0.505;
  })
})
</script>

<style lang="less" scoped>
.table {
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
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

:deep(el-table__body-wrapper) {
  max-height: calc(100%-30%);
  overflow: hidden;
}
.color-block {
  width: 35px;
  height: 20px;
}
</style>
