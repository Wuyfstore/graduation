<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-scrollbar
          ><el-form
            :model="dialogForm"
            :label-width="modalConfig.labelWidth"
            :size="modalConfig.size"
            style="max-height: 60vh"
          >
            <template v-for="item in modalConfig.formItems" :key="item.prop">
              <el-form-item :label="item.label" :prop="item.prop">
                <!-- <component :is="`el-${item.type}`"></component> -->
                <template v-if="item.type === 'input'">
                  <el-input
                    v-model="dialogForm[item.prop]"
                    :placeholder="item.placeholder"
                  ></el-input>
                </template>
                <template v-if="item.type === 'date-picker'">
                  <el-date-picker
                    v-model="dialogForm[item.prop]"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    size="large"
                  />
                </template>
                <template v-if="item.type === 'color-picker'">
                  <el-color-picker
                    v-model="dialogForm[item.prop]"
                    color-format="hex"
                    size="large"
                  />
                </template>
                <template v-if="item.type === 'select'">
                  <el-select
                    v-model="dialogForm[item.prop]"
                    :placeholder="item.placeholder"
                    style="width: 100%"
                  >
                    <template v-for="option in item.options" :key="option.value">
                      <el-option :label="option.label" :value="option.value" />
                    </template>
                  </el-select>
                </template>
                <template v-if="item.type === 'upload'">
                  <el-upload
                    class="upload"
                    :drag="true"
                    :list-type="'picture'"
                    :limit="1"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                  >
                    <el-icon><Plus /></el-icon>
                  </el-upload>
                </template>
                <template v-if="item.type === 'custom'">
                  <slot :name="item.slotName"></slot>
                </template>
              </el-form-item>
            </template> </el-form
        ></el-scrollbar>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false" size="large">取消</el-button>
          <el-button type="primary" @click="handleComfirmClick" size="large">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import useDataStore from '@/stores/data'
import { Plus } from '@element-plus/icons-vue'
import type { ModalProps } from '@/types/Props'
import type { UploadProps } from 'element-plus'

const props = defineProps<ModalProps>()

// 定义内部的属性
const dialogVisible = ref(false)
// 定义form数据
const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const dialogForm = reactive(initialForm)

const isNewRef = ref<boolean>(true)
const editData = ref<any>()

const dataStore = useDataStore()

// demo

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}

// 确认添加  逻辑
const handleComfirmClick = () => {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑数据
    dataStore.updateTargetData(
      props.modalConfig.pageName,
      editData.value.id ?? editData.value.username,
      dialogForm
    )
  } else {
    console.log(dialogForm)
    // 创建新的数据
    dataStore.newData(props.modalConfig.pageName, dialogForm)
  }
}

const setDialogVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in dialogForm) {
      dialogForm[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in dialogForm) {
      const item = props.modalConfig.formItems.find((item) => item.prop === key)
      dialogForm[key] = item ? item.initialValue : ''
      // console.log(dialogForm)
    }
    editData.value = null
  }
}

defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 1vw;

  .el-form {
    padding: 0 1vw;
  }
}

:deep(.upload) {
  width: 100%;
}
</style>
