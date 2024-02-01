<template>
  <div class="header">
    <el-menu
      mode="horizontal"
      default-active="1"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="rgb(32, 79, 113)"
    >
      <div v-for="item in menuLists" :key="item.id">
        <div v-if="item.type === 'function'">
          <el-menu-item :index="item.id + ''" @click="handleItemClick(item.path)">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </div>
        <div v-else-if="item.type === 'custom'">
          <el-menu-item disabled>
            <h2>{{ item.name }}</h2>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
    <!-- <switchModal class="switchModal" /> -->
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { menuLists } from '@/assets/config/header'
// import switchModal from '@/components/switchModal.vue'


const router = useRouter()

// 监听item点击
const handleItemClick = (path: string) => {
  router.push(path)
}
</script>

<style lang="less" scoped>
.el-menu {
  // align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
.el-menu-item.is-disabled {
  opacity: 1;
  cursor: auto;
  background: 0 0 !important;
}

.switchModal {
  position: absolute;
  top: 1.5%;
  right: 1%;
}
</style>
