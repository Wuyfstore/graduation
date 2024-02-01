import type { ModalConfig } from '@/types/Props'

const modalConfig: ModalConfig = {
  pageName: '/holetype',
  header: {
    newTitle: '新建类型',
    editTitle: '编辑类型'
  },
  labelWidth: '120px',
  size: 'default',
  formItems: [
    {
      type: 'input',
      label: '钻孔类型',
      prop: 'type',
      placeholder: '请输入钻孔类型'
    }
  ]
}

export default modalConfig
