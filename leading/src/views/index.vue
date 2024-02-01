<template>
  <div class="home">
    <baseMap />
    <div id="autofit">
      <Header />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import autofit from 'autofit.js'
import baseMap from '@/views/map/baseMap.vue'
import Header from '@/views/map/dataScreen/header/index.vue'

onMounted(() => {
  autofit.init({
    el: `#autofit`,
    resize: true,
    transition: 0.3,
    dh: 1080,
    dw: 1920,
    ignore: []
  })
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  #autofit {
    position: absolute;
    pointer-events: none;
  }
}
</style>
