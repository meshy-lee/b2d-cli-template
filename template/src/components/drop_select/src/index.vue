<template>
    <div class="drop-select" :class="{'drop-select-open': open}">
      <p class="sel-show" @click="toggleList">{{curLabel}}</p>
      <ul class="sel-list" v-show="open">
        <li class="sel-item" :class='{"active": curVal===v.val}' v-for="(v, $index) in innerRenderList" :key='$index' @click='handleSelect(v)'>{{v.label}}</li>
      </ul>
    </div>
</template>

<script>
import {addEventListen, removeEventListen} from '@/utils/move_event/index'
import {eventBindMixin} from '@/utils/mixin/index'
export default {
  name: 'dropSelect',
  mixins: [eventBindMixin],
  props: {
    listnerVal: { // 监听的值
      type: String,
      default: ''
    },
    renderList: {
      type: Array,
      default: () => []
    },
    showEmpty: { // 是否显示第一项请选择
      type: Boolean,
      default: true
    },
    defaultVal: {
      default: ''
    }
  },
  data () {
    return {
      open: false,
      curLabel: '请选择',
      curVal: '',
      innerRenderList: []
    }
  },
  methods: {
    init () {
      this.innerRenderList = this.renderList.map(ele => {
        if (ele.val === this.defaultVal) {
          this.curLabel = ele.label
          this.curVal = ele.val
        }
        return ele
      })
    },
    toggleList () {
      this.open = !this.open
    },
    eveCallbackFun () { // 点击其它地方，隐藏功能。此处不可或缺
      this.open = false
    },
    handleSelect (v) {
      this.curLabel = v.label
      this.curVal = v.val
      this.$emit('input', v.val)
      this.eveCallbackFun()
    }
  },
  watch: {
    listnerVal (newVal, oldVal) {
      this.innerRenderList.forEach(ele => {
        if (ele.val === newVal) this.curLabel = ele.label
      })
    },
    renderList (val) {
      this.init()
    }
  },
  created () {
    this.init()
  },
  mounted () {
    addEventListen(document.body, 'mousedown', this._eveFn)
  },
  destroyed () {
    removeEventListen(document.body, 'mousedown', this._eveFn)
  }
}
</script>

<style lang='less' scoped>
.drop-select{
  display: inline-block;
  height: 30px;
  line-height: 30px;
  position: relative;
  margin: 0;
  min-width: 172px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #cccccc;
  color: #999999;
  cursor: pointer;
  .sel-show{
    height: 100%;
    position: relative;
    text-indent: 10px;
  }
  .sel-list{
    width: 100%;
    max-height: 156px;
    padding-top: 2px;
    overflow: auto;
    background: #ffffff;
    position: absolute;
    z-index: 100;
    left: 0;
    border-radius: 4px;
    border: 1px solid #cccccc;
    top: 32px;
    li{
      width: 100%;
      height: 30px;
      text-indent: 10px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      &:hover{
        background: #f2f9fc;
        color: #01acf3;
      }
      &:last-child{
        border-radius: 0 0 4px 4px;
      }
    }
    .active {
      background: #f2f9fc;
      color: #01acf3;
    }
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    right: 12px;
    top: 14px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #999999;
  }
}
.drop-select-open{
  &:after {
    top: 12px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 5px solid #999999;
    border-top: none;
  }
}
.drop-select-open .sel-show{
  &:after {
    top: 12px;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 4px solid #000000;
    border-top: none;
  }
}
.drop-select-open{
  &:after {
    top: 12px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 5px solid #999999;
    border-top: none;
  }
}
</style>
