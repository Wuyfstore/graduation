import type { ModalConfig } from '@/types/Props'

const modalConfig: ModalConfig = {
  pageName: '/age',
  header: {
    newTitle: '新建时代',
    editTitle: '编辑时代'
  },
  labelWidth: '120px',
  size: 'default',
  formItems: [
    {
      type: 'input',
      label: '成因时代',
      prop: 'ageName',
      placeholder: '请输入成因时代'
    }
  ]
}

export default modalConfig
