<template>
  <div class="form">
    <el-form ref="FormRef" :model="Form" :label-width="formConfig.labelWidth ?? '60px'">
      <template v-for="item in formConfig.formItems" :key="item.prop">
        <el-form-item :label="item.label" :prop="item.prop">
          <template v-if="item.type === 'data'">
            <div></div>
          </template>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'

interface FormProps {
  formConfig: {
    labelWidth?: string
    dataUrl: string
    formItems: any[]
  }
}

interface HoleInfo {
  id: string | number
  label: string
  OriginalHoleNumber: string
  jobNumber: string | null
  jobName: string | null
}

const holeInfo = reactive<HoleInfo>({
  id: 0
})

const props = defineProps<FormProps>()

// 定义form数据
const initialForm: any = {}
for (const item of props.formConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const Form = reactive(initialForm)

const FormRef = ref<InstanceType<typeof ElForm>>()
</script>

<style lang="less" scoped></style>
