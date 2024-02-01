const searchConfig = {
  labelWidth: '110px',
  pageName: '/rock',
  formItems: [
    {
      type: 'input',
      prop: 'projectName',
      label: '钻孔工程名称',
      placeholder: '请输入钻孔工程名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'name',
      label: '工程地质名称',
      placeholder: '请输入工程地质名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'ageOfGenesisType',
      label: '成因时代',
      placeholder: '请输入成因时代',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'engineeringGeoType',
      label: '工程地质层岩性',
      placeholder: '请输入工程地质层岩性',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'histogramType',
      label: '钻孔地质层岩性',
      placeholder: '请输入钻孔地质层岩性',
      initialValue: ''
    }
  ]
}

export default searchConfig
