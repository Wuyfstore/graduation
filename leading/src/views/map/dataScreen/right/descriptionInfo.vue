<template>
  <PanelCard :title="config.rightBottomTitle">
    <template #body>
      <div :class="$style.content"></div>
    </template>
  </PanelCard>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import config from '@/config'
import PanelCard from '@/components/common/panelCard/index.vue'
</script>

<style lang="scss" module>
.content {
  height: 559px;
  font-size: large;
}
</style>
