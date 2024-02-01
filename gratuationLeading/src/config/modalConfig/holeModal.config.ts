import type { ModalConfig } from '@/types/Props'

const modalConfig: ModalConfig = {
  pageName: '/ntproject',
  header: {
    newTitle: '新建信息',
    editTitle: '编辑信息'
  },
  labelWidth: '120px',
  size: 'default',
  formItems: [
    {
      type: 'input',
      label: '钻孔统一编号',
      prop: 'label',
      placeholder: '请输入编号',
      initialValue: ''
    },
    {
      type: 'input',
      label: '钻孔原始编号',
      prop: 'OriginalHoleNumber',
      placeholder: '请输入编号',
      initialValue: ''
    },
    {
      type: 'input',
      label: '工程编号',
      prop: 'jobNumber',
      placeholder: '请输入编号',
      initialValue: ''
    },
    {
      type: 'input',
      label: '工程名称',
      prop: 'jobName',
      placeholder: '请输入工程名称',
      initialValue: ''
    },
    {
      type: 'input',
      label: '钻孔位置',
      prop: 'HolePosition',
      placeholder: '请输入钻孔位置',
      initialValue: ''
    },
    {
      type: 'input',
      label: '钻孔类型',
      prop: 'HoleType',
      placeholder: '请输入钻孔类型',
      initialValue: ''
    },
    {
      type: 'input',
      label: '经度(度)',
      prop: 'lon',
      placeholder: '请输入经度'
      //   initialValue: ''
    },
    {
      type: 'input',
      label: '纬度(度)',
      prop: 'lat',
      placeholder: '请输入纬度'
      //   initialValue: ''
    },
    {
      type: 'input',
      label: '公厘网坐标X(m)',
      prop: 'MmGirdCoordX',
      placeholder: '请输入公厘网坐标X',
      initialValue: ''
    },
    {
      type: 'input',
      label: '公厘网坐标Y(m)',
      prop: 'MmGirdCoordY',
      placeholder: '请输入公厘网坐标Y',
      initialValue: ''
    },
    {
      type: 'input',
      label: '地面标高(m)',
      prop: 'groundElevation',
      placeholder: '请输入地面标高',
      initialValue: ''
    },
    {
      type: 'input',
      label: '钻孔深度(m)',
      prop: 'drillingDepth',
      placeholder: '请输入钻孔深度',
      initialValue: ''
    },
    {
      type: 'input',
      label: '初见水位(m)',
      prop: 'initWaterLevel',
      placeholder: '请输入初见水位',
      initialValue: ''
    },
    {
      type: 'input',
      label: '稳定水位(m)',
      prop: 'FixedLevel',
      placeholder: '请输入稳定水位',
      initialValue: ''
    },
    {
      type: 'input',
      label: '施工单位',
      prop: 'ConstructionOrginization',
      placeholder: '请输入施工单位',
      initialValue: ''
    },
    {
      type: 'input',
      label: '施工日期',
      prop: 'CommencementDate',
      placeholder: '请输入施工日期',
      initialValue: ''
    }
  ]
}

export default modalConfig
