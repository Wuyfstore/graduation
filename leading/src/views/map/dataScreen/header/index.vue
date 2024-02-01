<template>
  <div :class="$style.header">
    <div :class="$style.header_title">
      <span :class="$style.header_title_text">{{ config.headerTitle }}</span>
    </div>
    <div :class="$style.header_btn">
      <div :class="($style.btn_group, $style.date_info)">
        <svg-icon iconClass="sun" className="sun" />
        <span :class="$style.time">{{ time }}</span>
      </div>
      <div :class="$style.btn_group">
        <el-dropdown :class="$style.avatar_container" trigger="click">
          <div :class="$style.avatar_wrapper">
            <el-avatar :class="$style.user_avatar" style="width: 2.5rem; height: 2.5rem">
              <svg-icon icon-class="user" style="color: #1283fb"></svg-icon>
            </el-avatar>
            <i :class="$style.el_icon_caret_bottom" />
          </div>
          <template #dropdown>
            <el-dropdown-menu :class="$style.user_dropdown">
              <el-dropdown-item>
                <a href="http://route.walkgis.club:28085/#/">
                  <span style="display: block">后台管理</span>
                </a>
              </el-dropdown-item>
              <el-dropdown-item divided @click="logout">
                <span style="display: block">登出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import config from '@/config'
import { dayjs } from 'element-plus'

const time = ref('')

const getTime = () => {
  time.value = dayjs().format('YYYY/MM/DD HH:mm:ss')
}

const logout = () => {}

onMounted(() => {
  getTime()
  setInterval(() => getTime(), 1000)
})
</script>

<style lang="scss" module>
.header {
  position: absolute;
  top: 0%;
  left: 0%;
  height: 80px;
  width: 100%;
  background: linear-gradient(
    180deg,
    #0b1f3d 0%,
    rgba(0, 33, 81, 0.7) 52.08%,
    rgba(0, 2, 5, 0) 100%
  );
  pointer-events: auto;
  //border-bottom: 0.5px solid rgba(172, 169, 169, 0.281);
  .header_title {
    width: 100%;
    height: 100%;
    background: url('@/assets/img/header/top.png') center no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .header_title_text {
      height: 80px;
      text-align: center;
      color: #ffffff;
      font-family: 'YouSheBiaoTiHei';
      font-style: normal;
      font-weight: 500;
      font-size: 2rem;
      line-height: 4rem;
      letter-spacing: 0.08em;
      text-align: center;
      text-shadow: 0px 0px 12px #1283fb;
    }
  }
  .header_btn {
    position: absolute;
    right: 0%;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 1.6px 0px;
    gap: 10px;
    .btn_group {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      height: 100%;
      gap: 10px;
      .avatar_wrapper {
        cursor: pointer;
      }
      .btn_nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .avatar-wrapper {
        cursor: pointer;
      }
    }
    .navs {
      width: fit-content;
      height: 100%;
      .btn_nav {
        width: 80px;
        height: 100%;
        background: transparent;
        .name {
          margin: 8px 0px;
          font-family: 'Alibaba PuHuiTi 2.0';
          font-style: normal;
          font-weight: 700;
          font-size: 14px;
          text-align: center;
          color: #cfcfd0;
        }
        .icon {
          width: 24px;
          height: 24px;
          color: #cfcfd0;
        }
        .tip {
          width: 16px;
          height: 16px;
          position: absolute;
          bottom: 0;
          transform: translateY(50%);
          color: #cfcfd0;
        }
        &:hover {
          .tip,
          .icon,
          .name {
            color: #ffebad;
          }
        }
        &.active {
          .icon,
          .name {
            color: #ffebad;
          }
          .tip {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    .tool {
      width: 160px;
      height: 48px;
      background: url('@/assets/img/header/btn-svg.png') center no-repeat;
      background-size: 100% 100%;
      span {
        font-family: 'Alibaba PuHuiTi 2.0';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        color: #ffffff;
      }
    }
    .date_info {
      width: fit-content;
      min-width: 270px;
      background: url('@/assets/img/header/dateBgi.png') center no-repeat;
      background-size: 100% 100%;
      .svg_icon {
        width: 24px;
        height: 24px;
      }
      .time {
        margin: 0px 10px;
        font-family: 'Alibaba PuHuiTi 2.0';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        letter-spacing: 0.08em;
        color: #ffffff;
      }
    }
    .btn_group:last-child {
      margin-right: 16px;
    }
  }
}
</style>
