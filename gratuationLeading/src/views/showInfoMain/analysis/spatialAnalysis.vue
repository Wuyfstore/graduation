<template>
  <div class="analysis">
    <el-tabs type="border-card">
      <template v-for="item in analysisConfig">
        <el-tab-pane :label="item.label">
          <template #>
            <component :is="item.component"/>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {analysisConfig} from '@/config/analysisConfig'
</script>
<style lang="less" scoped>
.analysis {
  top: 2%;
  left: 1%;
  padding: 0.5% 0;
  width: 18%;
  height: 29%;
  overflow: auto;
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
</style>
@/config/analysisConfig