const contentConfig = {
  pageName: '/menu',
  defaultPageSize: 10,
  pageSizes: [10, 15, 20],
  header: {
    title: '菜单列表',
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
      label: '名称',
      prop: 'name'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '符号',
      prop: 'icon'
      // width: '110px'
    },
    {
      type: 'normal',
      align: 'center',
      label: '路径',
      prop: 'path'
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
