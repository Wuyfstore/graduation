<template>
  <PanelCard :title="config.leftBottomTitle">
    <template #body>
      <div :class="$style.content">
        <div :class="$style.foritem" v-for="(item, index) in config.holeInfo" :key="index">
          <span style="color: #cfcdcd">{{ item }}：</span>
          <span style="color: #ebeaea">{{
            state.holeInfo[index] ? state.holeInfo[index] : '暂无数据'
          }}</span>
        </div>
      </div>
    </template>
  </PanelCard>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import config from '@/config'
import state from '@/state'
import PanelCard from '@/components/common/panelCard/index.vue'
import { getAllDatas } from '@/server/https'

const activeId = computed(() => {
  return Number(state.clickedEntityId)
})

const getActivedEntityData = async () => {
  const data = await getAllDatas('/ntproject', activeId.value)
  Object.assign(state.holeInfo, data)
}

onMounted(getActivedEntityData)
</script>

<style lang="scss" module>
.content {
  height: 559px;
  width: 100%;
  font-size: large;
}

.foritem {
  padding-bottom: 17px;
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 10px;
}
</style>
