/**
 * 简易防抖函数
 * @param {Function} func -防抖目标函数
 * @param {Number} gap - 防抖时间间隔
 */
export const debounce = (func, gap) => {
    let timer
    return function () {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, arguments)
      }, gap)
    }
  }