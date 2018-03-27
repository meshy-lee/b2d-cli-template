<template>
    <div class="time-pick">
        <div class="clear-fixed">
            <input class="time-text" v-model="model" :disabled="disabled" readonly @click="inputClick" :placeholder="placeholder"/>
        </div>
        <time-dialog ref="dialog" :class="dialogClass" :show="showDialog" @timeChange="timeChange" :begin="begin"
                     :end="end" :reset="reset"></time-dialog>
    </div>
</template>

<script>
import timeDialog from './time_dialog'
export default {
  name: 'gtTimePick',
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
    show: {
      type: Boolean,
      default: false
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
      dialogClass: '',
      init: false,
      isIllegal: false,
      reset: false
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
  watch: {
    show (val) {
      if (val) {
        this.showDialog = true
      }
    },
    showDialog (val) {
      if (val) {
        let clientHeight = document.documentElement.clientHeight
        let elBottom = this.$el.getBoundingClientRect().bottom
        this.dialogClass =
          elBottom + 320 < clientHeight
            ? 'time-dialog-bottom'
            : 'time-dialog-top'
        this.$emit('selected')
      }
    },
    value (val, valOld) {
      if (this.init) this.val = val
      if (val === '' && valOld !== '') {
        this.reset = true
        this.val = val
      }
    }
  },
  computed: {
    model: {
      get () {
        return this.val
      },
      set (val) {
        this.val = val
        this.$emit('input', val)
      }
    }
  },
  methods: {
    inputClick () {
      this.init = true
      this.showDialog = true
    },

    addEventListen (event, fn) {
      if (document.addEventListener) {
        document.body.addEventListener(event, fn, false)
      } else if (document.attachEvent) {
        document.body.attachEvent('on' + event, fn)
      }
    },
    parseTimeStr (s) {
      let splitArg = s.split(':')
      return {
        hour: splitArg[0],
        minute: splitArg[1],
        second: splitArg[2]
      }
    },
    // 日期补零
    zero (n) {
      return n < 10 ? (n === 0 || n === '0' ? '00' : '0' + n) : n + ''
    },
    timeChange (v) {
      this.isIllegal = false
      this.reset = false
      let { hour: vHour, minute: vMinute } = this.parseTimeStr(v)
      if (this.begin !== '') {
        let { hour, minute } = this.parseTimeStr(this.begin)
        let temp =
          Number(vHour) * 60 +
          Number(vMinute) -
          Number(hour) * 60 -
          Number(minute)
        if (temp < 0) {
          this.isIllegal = true
        }
      }
      if (this.end !== '') {
        let { hour, minute } = this.parseTimeStr(this.end)
        let temp =
          Number(hour) * 60 +
          Number(minute) -
          Number(vHour) * 60 -
          Number(vMinute)
        if (temp < 0) {
          this.isIllegal = true
        }
      }

      if (Number(vHour) > 23 || Number(vMinute) > 59) this.isIllegal = true

      if (!this.isIllegal) {
        this.val = `${this.zero(Number(vHour))}:${this.zero(
          Number(vMinute)
        )}:00`
        this.$emit('input', this.val)
      }
    }
  },
  components: {
    timeDialog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
.has-error {
  .time-text {
    border-color: #f16464 !important;
  }
}
.time-pick {
  position: relative;
  display: inline-block;
  vertical-align: middle;

  .clear-fixed {
    overflow: hidden;
  }

  .time-text {
    border: 1px solid #ccc;
    padding: 4px 0;
    border-radius: 4px;
    font-size: 14px;
    width: 78px;
    text-align: center;
    float: left;

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: #eee;
    }
  }

  .time-dialog-bottom {
    position: absolute;
    top: 30px;
    border-radius: 5px;
  }

  .time-dialog-top {
    position: absolute;
    bottom: 32px;
    border-radius: 5px;
  }
}
</style>
