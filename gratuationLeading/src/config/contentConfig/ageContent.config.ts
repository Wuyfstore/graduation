const contentConfig = {
  pageName: '/age',
  defaultPageSize: 10,
  pageSizes: [10, 15, 20],
  header: {
    title: '成因时代列表',
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
      label: '成因时代',
      prop: 'ageName'
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
