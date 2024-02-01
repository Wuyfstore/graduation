<template>
  <PanelCard :title="config.rightTopTitle">
    <template #body>
      <div class="content">
        <div class="chart1">
          <!-- <barCharts :options="barChartConfig" style="" /> -->
          <div class="title"><span>{{}}</span><span>钻孔</span></div>
        </div>
      </div>
    </template>
  </PanelCard>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import config from '@/config'
// import barChartConfig from '@/components/common/echarts/config/barChart.config'
import PanelCard from '@/components/common/panelCard/index.vue'
import barCharts from '@/components/common/echarts/index.vue'
</script>

<style lang="scss" module></style>
