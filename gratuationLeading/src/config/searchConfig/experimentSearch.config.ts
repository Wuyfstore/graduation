const searchConfig = {
  labelWidth: '90px',
  pageName: '/experiment',
  formItems: [
    {
      type: 'input',
      prop: 'layerId',
      label: '层号',
      placeholder: '请输入层号',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'holeId',
      label: '孔号',
      placeholder: '请输入孔号',
      initialValue: ''
    }
  ]
}

export default searchConfig
