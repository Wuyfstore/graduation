<template>
  <div class="login-panel">
    <h2>登录</h2>
    <div class="form">
      <el-form ref="ruleFormRef" :model="formLabelAlign" :rules="rules" size="large" status-icon>
        <el-form-item label="帐号" prop="username">
          <el-input v-model="formLabelAlign.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formLabelAlign.password" type="password" show-password />
        </el-form-item>
      </el-form>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginAction"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useLoginStore from '@/stores/login'
import { LoginFormType } from '@/types/Props'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const loginStore = useLoginStore()

// const isRememberPwd = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const formLabelAlign = reactive<LoginFormType>({
  username: '',
  password: ''
})

// 定义form的验证规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入帐号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,20}$/, message: '必须在3-12位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上的字母或数字组成', trigger: 'blur' }
  ]
})

const handleLoginAction = () => {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      const data = await loginStore.loginAction(formLabelAlign)
      if (data.status === 200) {
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
        // holeStore.getAllCount()
        router.push('/model')
      } else {
        ElMessage({
          message: '登录失败',
          type: 'error'
        })
      }
    } else {
      ElMessage.error('请输入正确的格式')
    }
  })
}
</script>

<style lang="less" scoped>
.login-panel {
  // height: 30%;
  // max-height: 35%;
  // 设置宽高比
  // aspect-ratio: 16/9;
  // width: 25%;
  // background-color: #fff;
  overflow: auto;
  position: absolute;
  background: rgba(160, 160, 160, 0.24);
  border-radius: 6px;
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.42),
      rgba(255, 255, 255, 0)
    )
    1 1;
  backdrop-filter: blur(10px);
  pointer-events: auto;

  h2 {
    color: #03a9f4;
    text-align: center;
  }
  .form {
    // padding: 2% 5% 0 5%;
    width: 25vw;
  }

  :deep(.el-form-item__label) {
    color: black;
  }
  .controls {
    margin: 0 5% 0% 5%;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    // margin: 0 5%;
    padding: 0 5%;
    width: 25vw;
  }
}
</style>
@/server/https
