<template>
    <div class="date-pick">
        <div class="clear-fixed">
            <input class="date-text" v-model="model" :disabled="disabled" readonly @click="inputClick($event)" :placeholder="placeholder"/>
        </div>
        <date-dialog :class="dialogClass" :show="showDialog" @dateChange="dateChange" @selected="selected" :begin="begin" :value="val"
                     :end="end"></date-dialog>
    </div>
</template>

<script>
import dateDialog from './date_dialog'
export default {
  name: 'gtDatePick',
  props: {
    placeholder: {
      type: String,
      default: '请选择时间'
    },
    value: {
      type: String,
      default: ''
    },
    begin: {
      type: String,
      default: ''
    },
    end: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      val: this.value,
      showDialog: false,
      dialogClass: ''
    }
  },
  created () {
    let that = this
    this.addEventListen('mousedown', function (e) {
      let tempEle = e.target
      while (tempEle !== document.body) {
        if (tempEle === that.$el) return false
        tempEle = tempEle.parentElement
      }
      that.showDialog = false
    })
  },
  computed: {
    model: {
      get () {
        return this.val
      },
      set (val) {
        if (val !== '') {
          this.val = val
          this.$emit('input', val)
        }
      }
    }
  },
  watch: {
    showDialog (val) {
      if (val) {
        let clientHeight = document.documentElement.clientHeight
        let elBottom = this.$el.getBoundingClientRect().bottom
        this.dialogClass =
          elBottom + 320 < clientHeight
            ? 'date-dialog-bottom'
            : 'date-dialog-top'
      }
    },
    value (val, valOld) {
      // 不能直接赋值，ie下有bug，原因不明
      if (val !== '') this.val = val
      if (val === '' && valOld !== '') this.val = val
    }
  },
  methods: {
    inputClick (e) {
      e.target.blur()
      this.showDialog = true
    },

    addEventListen (event, fn) {
      if (document.addEventListener) {
        document.body.addEventListener(event, fn, false)
      } else if (document.attachEvent) {
        document.body.attachEvent('on' + event, fn)
      }
    },

    dateChange (v) {
      this.val = v
      this.$emit('input', v)
    },

    selected () {
      // 为了避免和dateChange事件冲突，selected事件延时50ms
      setTimeout(() => {
        this.showDialog = false
        this.$emit('selected')
      }, 50)
    }
  },
  components: {
    dateDialog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
    .has-error {
        .date-text {
            border-color: #f16464 !important;
        }
    }
    .date-pick {
        position: relative;
        display: inline-block;
        vertical-align: middle;

        .clear-fixed {
            overflow: hidden;
        }

        .date-text {
            border: 1px solid #ccc;
            padding: 4px 0;
            border-radius: 4px;
            font-size: 14px;
            width: 98px;
            text-align: center;
            float: left;
            line-height: inherit;
            &:hover {
                cursor: pointer;
            }

            &:disabled {
                cursor: not-allowed;
                background-color: #eee;
            }
        }

        .date-dialog-bottom {
            position: absolute;
            top: 30px;
            border-radius: 5px;
        }

        .date-dialog-top {
            position: absolute;
            bottom: 32px;
            z-index: 10;
            border-radius: 5px;
        }
    }
</style>
