<template>
  <div class="search">
    <!-- 搜索关键字的表单 -->
    <el-form ref="formRef" :model="searchForm" :label-width="searchConfig.labelWidth ?? '80px'">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <!-- <component :is="`el-${item.type}`"></component> -->
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 重置和搜索按钮 -->
    <div class="btns">
      <el-button @click="handleReset" icon="Refresh">重置</el-button>
      <el-button @click="handleSearch" icon="Search" type="primary">搜索</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { SearchProps } from '@/types/Props'
import type { ElForm } from 'element-plus'

// 自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<SearchProps>()

// 根据配置文件生成form数据
const initialForm: any = []
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
const handleReset = () => {
  formRef.value?.resetFields()
  // 将事件发送出去，content内部重新发送网络请求
  emit('resetClick')
}

// 查询
const handleSearch = () => {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 1%;
  border-radius: 5px;

  .el-form-item {
    padding: 3% 10%;
    margin-bottom: 0;
  }
}
.btns {
  text-align: right;
  padding: 0 3% 1% 0;
}
</style>
