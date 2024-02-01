module.export = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 11',
        'last 10 versions'
      ]
    },
    'postcss-pxtorem': {
      rootValue: 24, //结果为：设计稿元素尺寸/16，比如元素宽1920px,最终页面会换算成 120rem
      propList: ['*'],
      unitPrecision: 5, //保留小数
      minPixelValue: 2 // 最小像素值
    }
  }
}
