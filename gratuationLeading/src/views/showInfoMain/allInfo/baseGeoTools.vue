<template>
  <div class="baseGeoTools">
    <div class="switch">
      <div class="switch-item">
        <p>距离</p>
        <el-switch
          v-model="distance"
          @click="handleDistanceClick(distance)"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        />
      </div>
      <div class="switch-item">
        <p>面积</p>
        <el-switch
          v-model="area"
          @click="handleAreaClick(area)"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        />
      </div>
      <profileView />
      <!-- <div class="switch-item">
        <p>弹窗</p>
        <el-switch v-model="popup" inline-prompt active-text="开启" inactive-text="关闭" />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MeasureDistance from '@/utils/MeasureDistance'
import MeasureArea from '@/utils/MeasureArea'
import profileView from '@/views/showInfoMain/allInfo/profileView.vue'

const distance = ref<boolean>(false)
const area = ref<boolean>(false)
// const popup = ref<boolean>(true)

const handleDistanceClick = (val: boolean) => {
  const DisClass = new MeasureDistance(window.Cesium.viewer!)
  DisClass.activation(val)
}

const handleAreaClick = (val: boolean) => {
  console.log(val)
  const AreaClass = new MeasureArea(window.Cesium.viewer!)
  AreaClass.activation(val)
}
</script>

<style lang="less" scoped>
.baseGeoTools {
  top: 19%;
  right: 1%;
  // padding: 0.5% 0;
  width: 18%;
  height: 8%;
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

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #fff;
  }
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
</style>
