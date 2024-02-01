<template>
  <div :class="$style.right">
    <diskCharts />
    <descriptionInfo class="descriptionInfo" />
  </div>
</template>

<script setup lang="ts">
import diskCharts from '@/views/map/dataScreen/right/diskCharts.vue'
import descriptionInfo from '@/views/map/dataScreen/right/descriptionInfo.vue'
</script>

<style lang="scss" module>
.right {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 16px;
  top: 100px;
  bottom: 20px;
  right: 22px /* 22/16 */;
  width: 425px;
  padding-left: 24px;
  transition: transform 1s ease;
  pointer-events: auto;
  &.hidden {
    transform: translateX(-100%);
  }
  & > .panel-card {
    flex-grow: 1;
    flex: 1;
  }
  .descriptionInfo {
    flex-grow: 1;
    flex: 2;
  }
}
</style>
