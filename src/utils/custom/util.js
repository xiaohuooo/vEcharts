import { customAlphabet } from 'nanoid'
/**
 * 生成随机id
 * @param {String} prefix 前缀
 * @param {Number} len 长度
 * @returns
 */
export const generateId = (prefix, len = 10, str = '1234567890abcdef') => {
  const nanoid = customAlphabet(str, len)

  const id = nanoid()
  return prefix ? `${prefix}_${id}` : id
}
export const UUID = () => {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

/**
 * 获取url参数
 * @param {String} variable 参数名
 * @param {String} url url地址
 * @returns
 */
export const getQueryVariable = (variable, url) => {
  // 从?开始获取后面的所有数据
  // var query = window.location.search.substring(1)
  var query = url || window.location.search.substring(1)

  // 从字符串&开始分隔成数组split
  var vars = query.split('&')
  // 遍历该数组
  for (var i = 0; i < vars.length; i++) {
    // 从等号部分分割成字符
    var pair = vars[i].split('=')
    // 如果第一个元素等于 传进来的参的话 就输出第二个元素
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}

/**
 * 替换 url 参数
 * @param {String} url
 * @param {String} key 参数名
 * @param {String} val 参数值
 * @returns
 */
export const replaceURLStrQuery = (url, key, val) => {
  const pattern = `${key}=([^&]*)`
  const replaceText = `${key}=${val}`

  if (url.match(pattern)) {
    let tmp = `/(${arg}=)([^&]*)/gi`
    tmp = url.replace(eval(tmp), replaceText)
    return tmp
  } else {
    if (url.match('[?]')) {
      return `${url}&${replaceText}`
    } else {
      return `${url}?${replaceText}`
    }
  }

  return `${url}\n${key}\n${val}`
}

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 * @param {Boolean} isDiff 是否区分中英文、符号
 */
export const cutStrByFullLength = (str = '', maxLength, isDiff = true) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)

    // 区别中英文、符号
    if (isDiff) {
      if (charCode >= 0 && charCode <= 128) {
        showLength += 1
      } else {
        showLength += 2
      }
    } else {
      showLength += 1
    }

    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

/**
 * 省略文本
 * @param {String} str 文本
 * @param {Number} length 最大长度
 * @param {*} fullLength  文本长度
 * @param {*} isDiff 是否区别中英文、符号
 * @returns
 */
export const ellipsisText = (str, length, fullLength, isDiff = true) => {
  const text = cutStrByFullLength(str, length, isDiff) + (fullLength > length ? '...' : '')
  return text
}
