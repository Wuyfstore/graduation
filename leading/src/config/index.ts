/**
 * @description 3个子配置，通用配置|主题配置|网络配置，建议在当前目录下修改config.js修改配置，会覆盖默认配置，也可以直接修改默认配置
 */
//默认配置
import { setting, netWork, viewerConfig } from './default'
//自定义配置
import config from './config'
const exp = { ...setting, ...netWork, ...config, ...viewerConfig }
//允许通过外部window.config覆盖的配置名,配置修改路径 public/data/config/config.js
// const windowConfigName = ['baseURL']
// if (window && window.config) {
//   for (const key in window.config) {
//     if (Object.hasOwnProperty.call(window.config, key)) {
//       if (windowConfigName.indexOf(key) >= 0) exp[key] = window.config[key]
//     }
//   }
// }
//导出配置（以自定义配置为主）
export default exp
