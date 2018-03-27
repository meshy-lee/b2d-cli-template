<template>
  <button v-if="type" v-hideFocus class="gt-btn-line gt--secondary" type="button"><slot></slot></button>
  <!-- <button v-else-if="type" v-hideFocus class="gt-btn-line gt--secondary" type="button"><slot></slot></button> -->
  <!-- 可以使用render函数进行处理。 -->
</template>

<script>
import { addEventListen, removeEventListen } from '@/utils/move_event/index'
export default {
  name: 'theBtn',
  props: {
    activeType: {
      type: String,
      default: 'throttle' // debounce
    }
  },
  data () {
    return {
      type: true
    }
  },
  methods: {
    handleClick () {
      this.$emit('handleClick')
    },
    debounce (fn, wait, ctx) { // 防抖
      let timer
      let arg = arguments
      return function () {
        clearTimeout(timer)
        timer = setTimeout(function () {
          fn.call(ctx, arg)
        }, wait)
      }
    },
    throttle (delay, action) { // 节流
      let last = 0
      return function () {
        let curr = +new Date()
        if (curr - last > delay) {
          action.apply(this, arguments)
          last = curr
        }
      }
    }
  },
  mounted () {
    addEventListen(this.$el, 'click', this.throttle(2000, this.handleClick))
  },
  destroyed () {
    removeEventListen(this.$el, 'click', this.throttle(2000, this.handleClick))
  }
}
</script>

<style lang='less' scoped>

</style>
