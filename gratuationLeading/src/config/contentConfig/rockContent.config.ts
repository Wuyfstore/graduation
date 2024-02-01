const contentConfig = {
  pageName: '/rock',
  defaultPageSize: 10,
  pageSizes: [10, 15, 20],
  header: {
    title: '钻孔岩层信息列表',
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
      label: '地层序号',
      prop: 'formationId'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '工程地质层名称',
      prop: 'name'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '工程地质层编号',
      prop: 'numbering'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '成因时代',
      prop: 'ageOfGenesisType'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '层底埋深',
      prop: 'buriedDeep'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '层底标高',
      prop: 'elevation'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '地层厚度',
      prop: 'thickness'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '工程地质层岩性',
      prop: 'engineeringGeoType'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '柱状图地层岩性',
      prop: 'histogramType'
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
