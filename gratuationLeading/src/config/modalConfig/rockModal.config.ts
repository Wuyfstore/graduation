import type { ModalConfig } from '@/types/Props'

const modalConfig: ModalConfig = {
  pageName: '/rock',
  header: {
    newTitle: '新建类型',
    editTitle: '编辑类型'
  },
  labelWidth: '120px',
  size: 'default',
  formItems: [
    {
      type: 'input',
      label: '地层序号',
      prop: 'formationId',
      placeholder: '请输入钻孔类型'
    },
    {
      type: 'input',
      label: '地层名称',
      prop: 'name',
      placeholder: '请输入钻孔类型'
    },
    {
      type: 'input',
      label: '地层编号',
      prop: 'numbering',
      placeholder: '请输入地层编号'
    },
    {
      type: 'input',
      label: '成因时代',
      prop: 'ageOfGenesisType',
      placeholder: '请输入成因时代'
    },
    {
      type: 'input',
      label: '层底埋深',
      prop: 'buriedDeep',
      placeholder: '请输入成因时代'
    },
    {
      type: 'input',
      label: '层底标高',
      prop: 'elevation',
      placeholder: '请输入层底标高'
    },
    {
      type: 'input',
      label: '地层厚度',
      prop: 'thickness',
      placeholder: '请输入地层厚度'
    },
    {
      type: 'input',
      label: '工程地质层岩性',
      prop: 'engineeringGeoType',
      placeholder: '请输入工程地质层岩性'
    },
    {
      type: 'input',
      label: '钻孔地层岩性',
      prop: 'histogramType',
      placeholder: '请输入钻孔地层岩性'
    },
    {
      type: 'input',
      label: '地层特征描述',
      prop: 'characterization',
      placeholder: '请输入地层特征描述'
    },
    {
      type: 'input',
      label: '对应钻孔',
      prop: 'projectName',
      placeholder: '请输入对应钻孔'
    }
  ]
}

export default modalConfig
