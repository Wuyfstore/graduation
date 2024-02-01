import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言

dayjs.extend(utc) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言

export const formatUTC = (utcString: string, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  // YYYY-MM-DD HH:mm:ss 时间格式
  // 在原来的时间上偏移几个小时
  const time = dayjs.utc(utcString).utcOffset(8).format(format)
  return time
}
