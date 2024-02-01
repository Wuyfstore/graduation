/**
 * @description 导出自定义配置
 **/
const config = {
  layout: 'vertical',
  donation: false,
  templateFolder: 'project',
  holeType: {
    标贯孔: 'bgk.png',
    静探孔: 'jtk.png',
    取样孔: 'qyk.png',
    取样标贯孔: 'qybgk.png',
    水文地质钻孔: 'sw.png',
    未知: 'wz.png'
  },
  holeInfo: {
    label: '钻孔统一编号',
    OriginalHoleNumber: '钻孔原始编号',
    jobNumber: '工程编号',
    jobName: '工程名称',
    holetype: '钻孔类型',
    lon: '经度',
    lat: '纬度',
    MmGirdCoordX: '公厘网坐标X(m)',
    MmGirdCoordY: '公厘网坐标Y(m)',
    groundElevation: '地面标高(m)',
    drillingDepth: '钻孔深度(m)',
    FixedLevel: '稳定水位(m)',
    ConstructionOrginization: '施工单位',
    CommencementDate: '施工日期'
  }
}

export default config
