<template>
  <div :class="$style.panel_card">
    <div :class="$style.panel_card_header">
      <div :class="$style.panel_card_title">{{ title }}</div>
      <slot name="header"></slot>
    </div>
    <div :class="$style.panel_card_body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
type props = {
  title: string
}

defineProps<props>()
</script>

<style lang="scss" module>
.panel_card {
  pointer-events: auto;
  // 为了给body分配高度
  display: flex;
  flex-direction: column;
  overflow: hidden;

  width: 100%;
  // background: linear-gradient(to right, rgba(14, 83, 187, 0.514) 0%, rgba(11, 102, 200, 0.5) 100%);
  background: rgba(8, 38, 83, 0.8);

  &.in_right {
    background: linear-gradient(to left, rgba(2, 49, 100, 0.4) 0%, rgba(2, 49, 100, 0.2) 100%);
  }
  & > .panel_card_header {
    display: flex;
    align-items: center;
    background: url('@/assets/img/panel-card/card-header.png') no-repeat;
    background-size: 100% 100%;
    // width: 200px;
    height: 40px;
    .panel_card_title {
      padding-left: 20px;
      color: #fff;
      font-family: YouSheBiaoTiHei;
      font-size: 24px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.1em;
      text-align: left;
    }
  }

  & > .panel_card_body {
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
    position: relative;
    border: 1px white solid;
    border-top: none;
    padding: 13.2px;

    border-image: linear-gradient(
        to bottom,
        rgba(0, 176, 255, 0),
        rgba(0, 176, 255, 0.35) 50%,
        rgba(0, 176, 255, 0.5) 100%
      )
      1;
    .decoration_bottom {
      position: absolute;
      bottom: 0;
      background: url('@/assets/img/panel-card/card-body-bottom.png') no-repeat;
      background-size: 100%;
      width: 100%;
      height: 14px;
      pointer-events: none;
    }
    .border_right {
      background-image: linear-gradient(
        to top,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      position: absolute;
      top: 0;
      right: 0;
      bottom: 14px;
      width: 2px;
    }
    .border_left {
      background-image: linear-gradient(
        to top,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.35) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 2px;
    }
  }
}
</style>
