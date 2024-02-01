const contentConfig = {
    pageName: '/experiment',
    defaultPageSize: 10,
    pageSizes: [10, 15, 20],
    header: {
      title: '标贯实验列表',
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
        label: '层号',
        prop: 'layerId'
        // width: '110px'
      },
      {
        type: 'normal',
        align: 'center',
        label: '孔号',
        prop: 'holeId'
        // width: '110px'
      },
      {
        type: 'normal',
        align: 'center',
        label: '实验编号',
        prop: 'experimentNumber'
        // width: '110px'
      },
      {
        type: 'normal',
        align: 'center',
        label: '标贯深度',
        prop: 'depth'
        // width: '110px'
      },
      {
        type: 'normal',
        align: 'center',
        label: '杆长',
        prop: 'rodLength'
        // width: '110px'
      },
      {
        type: 'normal',
        align: 'center',
        label: '杆长修正系数α',
        prop: 'correctionFactor'
        // width: '110px'
      },
      {
        type: 'normal',
        align: 'center',
        label: '实测击数',
        prop: 'measureHits'
        // width: '110px'
      },
      {
        type: 'normal',
        align: 'center',
        label: '修正击数',
        prop: 'fixedHits'
        // width: '110px'
      },
      {
        type: 'normal',
        align: 'center',
        label: '岩土名称',
        prop: 'geoName'
        // width: '110px'
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