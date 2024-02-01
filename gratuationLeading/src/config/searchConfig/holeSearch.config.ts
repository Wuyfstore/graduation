const searchConfig = {
  labelWidth: '100px',
  pageName: '/ntproject',
  formItems: [
    {
      type: 'input',
      prop: 'label',
      label: '钻孔统一编号',
      placeholder: '请输入编号',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'OriginalHoleNumber',
      label: '钻孔原始编号',
      placeholder: '请输入编号',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'jobNumber',
      label: '工程编号',
      placeholder: '请输入编号',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'jobName',
      label: '工程名称',
      placeholder: '请输入工程名称',
      initialValue: ''
    }
  ]
}

export default searchConfig
