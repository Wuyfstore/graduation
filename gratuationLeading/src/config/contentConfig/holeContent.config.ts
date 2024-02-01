const contentConfig = {
  pageName: '/ntproject',
  defaultPageSize: 5,
  pageSizes: [5, 10, 15, 20],
  header: {
    title: '钻孔列表',
    btnTitle: '新建信息'
  },
  propsList: [
    {
      type: 'selection',
      align: 'center',
      fixed: 'left'
    },
    {
      type: 'index',
      align: 'center',
      label: '序号',
      prop: 'id',
      width: '80px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '钻孔统一编号',
      prop: 'label'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '钻孔原始编号',
      prop: 'OriginalHoleNumber'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '工程编号',
      prop: 'jobNumber'
      // width: '100px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '工程名称',
      prop: 'jobName'
      // width: '100px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '钻孔位置',
      prop: 'HolePosition'
      // width: '100px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '钻孔类型',
      prop: 'HoleType'
      // width: '100px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '经度(度)',
      prop: 'lon'
    },
    {
      type: 'normal',
      align: 'center',
      label: '纬度(度)',
      prop: 'lat'
    },
    {
      type: 'normal',
      align: 'center',
      label: '公厘网坐标X(m)',
      prop: 'MmGirdCoordX'
      // width: '130px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '公厘网坐标Y(m)',
      prop: 'MmGirdCoordY'
      // width: '130px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '地面标高(m)',
      prop: 'groundElevation'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '钻孔深度(m)',
      prop: 'drillingDepth'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '初见水位(m)',
      prop: 'initWaterLevel'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '稳定水位(m)',
      prop: 'FixedLevel'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '施工单位',
      prop: 'ConstructionOrginization'
    },
    {
      type: 'normal',
      align: 'center',
      label: '施工日期',
      prop: 'CommencementDate'
    },
    {
      type: 'handler',
      align: 'center',
      label: '操作',
      fixed: 'right'
    }
  ]
}

export default contentConfig
