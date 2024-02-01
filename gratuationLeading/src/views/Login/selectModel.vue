<template>
  <div class="modelpage">
    <div class="modepage-box">
      <h1 class="title">功能模块</h1>
      <div class="model">
        <el-button class="modelpage-btn" type="primary" @click="handleClickModel('/showInfoMain')"
          >信息展示</el-button
        >
        <el-button
          class="modelpage-btn"
          type="info"
          @click="handleClickModel('/managementMain/System')"
          >信息管理</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClickModel = (path: string) => {
  router.push(path)
}
</script>

<style lang="less" scoped>
.modelpage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #464646;
  background-image: url('../../assets/img/GISBGPNG.png');

  .modepage-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 45%;
    // background-color: white;
  }

  .title {
    color: #fff;
  }

  .model {
    width: 100%;
    height: 100%;
    padding: 2%;
    .modelpage-btn {
      width: 46%;
      height: 100%;
      margin: 0 2%;
    }
  }
}
</style>
