<template>
  <div class="dataScreen">
    <div class="dataScreenCard">
      <el-row justify="space-evenly">
        <el-col :span="10">
          <div class="statistic-card">
            <el-statistic :value="holeCount">
              <template #title>
                <div style="display: inline-flex; align-items: center">钻孔数量</div>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="statistic-card">
            <el-statistic :value="holeTypeCount">
              <template #title>
                <div style="display: inline-flex; align-items: center">钻孔类型</div>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
      <el-row justify="space-evenly">
        <el-col :span="10">
          <div class="statistic-card">
            <el-statistic :value="engTypeCount">
              <template #title>
                <div style="display: inline-flex; align-items: center">工程地质类型</div>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="statistic-card">
            <el-statistic :value="histogramTypeCount">
              <template #title>
                <div style="display: inline-flex; align-items: center">钻孔地质类型</div>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useHoleStore from '@/stores/holeStore'

const holeStore = useHoleStore()
const { histogramTypeCount, engTypeCount, holeCount, holeTypeCount } = storeToRefs(holeStore)

onMounted(() => {
  holeStore.getAllCount()
})
</script>

<style lang="less" scoped>
.dataScreen {
  top: 2%;
  right: 1%;
  // padding: 0.5% 0;
  width: 18%;
  height: 15%;
  overflow: auto;
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

  .dataScreenCard {
    width: 100%;
    height: 60%;
    padding-bottom: 10%;
  }
}
.el-row {
  padding: 3% 0 0 0;
}
.el-col {
  text-align: center;
}

.el-statistic {
  --el-statistic-content-font-size: 20px;
}

.statistic-card {
  border-radius: 5px;
  background-color: var(--el-bg-color-overlay);
}
</style>
