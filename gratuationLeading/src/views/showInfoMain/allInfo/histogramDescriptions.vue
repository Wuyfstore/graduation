<template>
  <div class="descriptions">
    <el-descriptions title="钻孔柱状图" :column="2" border size="small">
      <el-descriptions-item :span="1">
        <template #label><div>孔号</div></template>
        {{ tarRockList.OriginalHoleNumber }}
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template #label>
          <div>工程编号</div>
        </template>
        {{ tarRockList.jobNumber }}
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template #label>
          <div>经度</div>
        </template>
        {{ tarRockList.lon }}
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template #label>
          <div>纬度</div>
        </template>
        {{ tarRockList.lat }}
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template #label>
          <div>工程名称</div>
        </template>
        {{ tarRockList.jobName }}
      </el-descriptions-item>
    </el-descriptions>
    <histogramTable />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useHoleStore from '@/stores/holeStore'
import histogramTable from './histogramTable.vue'

const holeStore = useHoleStore()
const { tarRockList } = storeToRefs(holeStore)
</script>

<style lang="less" scoped>
.descriptions {
  top: 29%;
  right: 1%;
  padding: 0.5% 0;
  width: 18%;
  height: 66%;
  position: absolute;
  // background: rgba(160, 160, 160, 0.24);
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

.el-descriptions {
  max-height: 40%;
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
</style>
