<template>
  <div class="content">
    <div class="header">
      <h3>{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button @click="handleNewUserClick" type="primary" icon="Plus">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        v-bind="contentConfig.childrenTree"
        :data="
          dataList.slice(
            (currentPage - 1) * contentConfig.defaultPageSize,
            currentPage * contentConfig.defaultPageSize
          )
        "
        border
        v-loading="loading"
        style="width: 100%"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item" :header-align="item.align">
              <template #default="scope">{{ formatUTC(scope.row[item.prop]) }}</template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item" :header-align="item.align">
              <template #default="scope">
                <el-button
                  @click="handleEditClick(scope.row)"
                  text
                  type="primary"
                  icon="Edit"
                  size="small"
                  >编辑</el-button
                >
                <el-button
                  @click="handleDeleteClick(scope.row)"
                  text
                  type="danger"
                  icon="Delete"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'color'">
            <el-table-column v-bind="item" :header-align="item.align">
              <template #default="{ row }">
                <div>
                  <div class="color-block" :style="{ backgroundColor: row.img }">{{ row.img }}</div>
                </div>

                <!-- <el-color-picker v-model="row.img" size="large" /> -->
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item" :header-align="item.align">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" :header-align="item.align" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="contentConfig.defaultPageSize"
        :page-sizes="contentConfig.pageSizes"
        layout=" total,sizes, prev, pager, next, jumper"
        :total="dataCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import type { ContentProps } from '@/types/Props'
import useDataStore from '@/stores/data'

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])
const props = defineProps<ContentProps>()

const currentPage = ref(1)
// const pageSize = ref(5)
const loading = ref(true)

const dataStore = useDataStore()
const { dataList, dataCount } = storeToRefs(dataStore)

//新建用户
const handleNewUserClick = () => {
  // console.log('新建用户')
  emit('newClick')
}

const fetchPageListData = async (path?: string, query?: any) => {
  // console.log(path, query)
  await dataStore.postAllDatas(props.contentConfig.pageName, path, query)
  loading.value = false
}

// 这里的参数还是要写的
const handleSizeChange = (val: number) => {
  // console.log(`${val} items per page`)
  fetchPageListData() //这里还有问题
}
const handleCurrentChange = (val: number) => {
  // console.log(`current page: ${val}`)
  //下面的方法暂时不需要使用
  // fetchPageListData()
}

// 编辑和删除
const handleEditClick = (info: any) => {
  // console.log('编辑行数据', info)
  emit('editClick', info)
}

const handleDeleteClick = async (data: any) => {
  // console.log('删除行数据', data)
  await dataStore.deleteTargetData(props.contentConfig.pageName, data.id ?? data.username)
}

defineExpose({ fetchPageListData })

onMounted(() => {
  fetchPageListData()
})
</script>

<style lang="less" scoped>
.content {
  margin-top: 15px;
  padding: 20px;
  background-color: #fff;

  .header {
    padding-bottom: 10px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    // 底部对齐
    align-items: end;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin-left: 0;
    padding: 10px 8px;
  }
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.color-block {
  color: black;
  height: 25px;
}
</style>
