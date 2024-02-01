const contentConfig = {
  pageName: '/user',
  defaultPageSize: 10,
  pageSizes: [10, 15, 20],
  header: {
    title: '用户列表',
    btnTitle: '新建用户'
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
      label: '用户名',
      prop: 'username'
    },
    {
      type: 'normal',
      align: 'center',
      label: '密码',
      prop: 'password'
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
