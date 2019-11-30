// 获取浏览器默认语言
function getLocale(name, defaultValue) {
  var arr
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2])
  } else {
    return defaultValue
  }
}

export default getLocale
