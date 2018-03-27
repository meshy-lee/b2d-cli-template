function addEventListen (target, event, fn) { // 事件绑定
  if (target.addEventListener && typeof target.addEventListener === 'function') {
    target.addEventListener(event, fn, false)
  } else if (target.attachEvent && typeof target.attachEvent === 'function') {
    target.attachEvent('on' + event, fn)
  }
}

function removeEventListen (target, event, fn) { // 事件解绑
  if (target.removeEventListener && typeof target.removeEventListener === 'function') {
    target.removeEventListener(event, fn, false)
  } else if (target.detachEvent && typeof target.detachEvent === 'function') {
    target.detachEvent('on' + event, fn)
  }
}

function getStyle (obj, attr) { // 获取样式用
  if (obj.currentStyle) {
    return obj.currentStyle[attr]
  } else {
    return getComputedStyle(obj, false)[attr]
  }
}

export {addEventListen, removeEventListen, getStyle}
