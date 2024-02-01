<template>
  <div :class="$style.left">
    <layerSwitch />
    <specificInfo class="specificInfo" />
  </div>
</template>

<script setup lang="ts">
import layerSwitch from '@/views/map/dataScreen/left/layerSwitch.vue'
import specificInfo from '@/views/map/dataScreen/left/specificInfo.vue'
</script>

<style lang="scss" module>
.left {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 16px;
  top: 100px;
  bottom: 20px;
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
  .specificInfo {
    flex-grow: 1;
    flex: 2;
  }
}
</style>
