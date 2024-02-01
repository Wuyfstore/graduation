import type { ModalConfig } from '@/types/Props'

const modalConfig: ModalConfig = {
  pageName: '/experiment',
  header: {
    newTitle: '新建数据',
    editTitle: '编辑数据'
  },
  labelWidth: '120px',
  size: 'default',
  formItems: [
    {
      type: 'input',
      label: '孔号',
      prop: 'holeId',
      placeholder: '请输入孔号'
    },
    {
      type: 'input',
      label: '层号',
      prop: 'layerId',
      placeholder: '请输入层号'
    },
    {
      type: 'input',
      label: '实验编号',
      prop: 'experimentNumber',
      placeholder: '请输入实验编号'
    },
    {
      type: 'input',
      label: '标贯深度(m)',
      prop: 'depth',
      placeholder: '请输入标贯深度'
    }
    ,
    {
      type: 'input',
      label: '杆长(m)',
      prop: 'rodLength',
      placeholder: '请输入杆长'
    },
    {
      type: 'input',
      label: '杆长修正系数α',
      prop: 'correctionFactor',
      placeholder: '请输入杆长修正系数'
    },
    {
      type: 'input',
      label: '实测击数',
      prop: 'measureHits',
      placeholder: '请输入实测击数'
    },
    {
      type: 'input',
      label: '修正击数',
      prop: 'fixedHits',
      placeholder: '请输入修正击数'
    },
    {
      type: 'input',
      label: '岩土名称',
      prop: 'geoName',
      placeholder: '请输入岩土名称'
    }
  ]
}

export default modalConfig
