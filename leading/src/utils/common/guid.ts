// 生成全局唯一标识符函数
export const Guid = () => {
  function S4() {
    // 生成一个随机数并转换为十六进制的字符串
    const Ustr = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    return Ustr
  }

  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}
