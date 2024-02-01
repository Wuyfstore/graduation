import type { ModalConfig } from '@/types/Props'

const modalConfig: ModalConfig = {
  pageName: '/user',
  header: {
    newTitle: '新建用户',
    editTitle: '编辑用户'
  },
  labelWidth: '120px',
  size: 'default',
  formItems: [
    {
      type: 'input',
      label: '用户名',
      prop: 'username',
      placeholder: '请输入用户名'
    },
    {
      type: 'input',
      label: '密码',
      prop: 'password',
      placeholder: '请输入密码'
    }
  ]
}

export default modalConfig
