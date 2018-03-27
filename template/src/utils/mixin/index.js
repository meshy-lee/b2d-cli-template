const eventBindMixin = {
  methods: {
    // 该方法用于点击其它地方目标组件消失。
    _eveFn (e) { // 其实可以用闭包来做，看心情啦~
      let tempEle = e.target
      while (tempEle !== document.body) {
        if (tempEle === this.$el) return false
        tempEle = tempEle.parentElement
      }
      this.eveCallbackFun && this.eveCallbackFun() // 默认一个回调函数eveCallbackFun
    }
  }
}

export {eventBindMixin}
