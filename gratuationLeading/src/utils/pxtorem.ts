import _ from 'lodash'
//以1920px 底图为准开发页面
export const setDomFontSize = () => {
  //(当前屏幕宽度，最小宽度为1200)/1920*24px
  const setSize =
    (Math.max(document.documentElement.getBoundingClientRect().width, 1366) / 1920) * 24
  document.documentElement.style.fontSize = setSize + 'px'
}

const setDomFontSizeBebounce = _.debounce(setDomFontSize, 400)
window.addEventListener('resize', setDomFontSizeBebounce, false)
