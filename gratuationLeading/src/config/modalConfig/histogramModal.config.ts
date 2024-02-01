import type { ModalConfig } from '@/types/Props'

const modalConfig: ModalConfig = {
  pageName: '/histogram',
  header: {
    newTitle: '新建类型',
    editTitle: '编辑类型'
  },
  labelWidth: '120px',
  size: 'default',
  formItems: [
    {
      type: 'input',
      label: '岩性名称',
      prop: 'type',
      placeholder: '请输入岩性名称'
    },
    {
      type: 'color-picker',
      label: '标识',
      prop: 'img',
      placeholder: '请上传标识'
    }
  ]
}

export default modalConfig
