const contentConfig = {
  pageName: '/histogram',
  defaultPageSize: 10,
  pageSizes: [10, 15, 20],
  header: {
    title: '钻孔岩层类型列表',
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
      label: '岩层类型',
      prop: 'type'
      // width: '110px'
    },
    {
      // type: 'normal',
      type: 'color',
      align: 'center',
      label: '唯一标识',
      prop: 'img'
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
