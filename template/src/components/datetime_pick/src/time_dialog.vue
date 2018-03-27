<template>
    <div class="time-dialog" v-show="showDialog">
        <div class="left-block">
            <div class="left-button-block">
                <span class="dos-iconfont icon-timepick-prev button" @click="hourNext"
                      :class="{'disabled': hourNextDisabled}"></span>
            </div>
            <div class="input-block" :class="{'has-error': isIllegal || hourIllegal}">
                <input type="text" v-model="hour" @keypress="dirty=true"/>
                <span class="text">时</span>
            </div>
            <div class="left-button-block">
                <span class="dos-iconfont icon-timepick-next button" @click="hourPrev"
                      :class="{'disabled': hourPrevDisabled}"></span>
            </div>
        </div>
        <div class="right-block">
            <div class="right-button-block">
                <span class="dos-iconfont icon-timepick-prev button" @click="minuteNext"
                      :class="{'disabled': minuteNextDisabled}"></span>
            </div>
            <div class="input-block" :class="{'has-error': isIllegal || minuteIllegal}">
                <input type="text" v-model="minute" @keypress="dirty=true"/>
                <span class="text">分</span><br>
            </div>
            <div class="right-button-block">
                <span class="dos-iconfont icon-timepick-next button" @click="minutePrev"
                      :class="{'disabled': minutePrevDisabled}"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'timeDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    begin: {
      type: String,
      default: '10:35:00'
    },
    end: {
      type: String,
      default: '11:39:21'
    },
    value: {
      type: String,
      default: ''
    },
    reset: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hour: 0,
      minute: 0,
      hourPrevDisabled: false,
      minutePrevDisabled: false,
      hourNextDisabled: false,
      minuteNextDisabled: false,
      showDialog: false,
      dirty: false,
      isIllegal: false,
      hourIllegal: false,
      minuteIllegal: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 日期补零
    zero (n) {
      return n < 10 ? (n === 0 || n === '0' ? '00' : '0' + n) : n + ''
    },
    // 解构时间字符串
    parseTimeStr (s) {
      let splitArg = s.split(':')
      return {
        hour: splitArg[0],
        minute: splitArg[1],
        second: splitArg[2]
      }
    },
    buttonInit () {
      this.hourPrevDisabled = false
      this.minutePrevDisabled = false
      this.hourNextDisabled = false
      this.minuteNextDisabled = false
      // 判断是否在begin和end区间之内
      if (this.begin !== '') {
        let { hour, minute } = this.parseTimeStr(this.begin)
        let temp =
          Number(this.hour) * 60 +
          Number(this.minute) -
          Number(hour) * 60 -
          Number(minute)
        if (temp <= 0) {
          this.hour = hour
          this.minute = minute
          this.hourPrevDisabled = true
          this.minutePrevDisabled = true
        } else if (temp < 60) this.hourPrevDisabled = true

        if (Number(this.hour) === 23) {
          this.hourNextDisabled = true
          if (Number(this.minute) === 59) {
            this.minuteNextDisabled = true
          }
        }
      }
      if (this.end !== '') {
        let { hour, minute } = this.parseTimeStr(this.end)
        let temp =
          Number(hour) * 60 +
          Number(minute) -
          Number(this.hour) * 60 -
          Number(this.minute)
        if (temp <= 0) {
          this.hour = hour
          this.minute = minute
          this.hourNextDisabled = true
          this.minuteNextDisabled = true
        } else if (temp < 60) this.hourNextDisabled = true

        if (Number(this.hour) === 0) {
          this.hourPrevDisabled = true
          if (Number(this.minute) === 0) this.minutePrevDisabled = true
        }
      }
    },
    init () {
      // 初始化时间
      let now = new Date()
      if (this.value !== '') {
        let { hour, minute } = this.parseTimeStr(this.value)
        this.hour = hour
        this.minute = minute
      } else {
        this.hour = this.zero(now.getHours())
        this.minute = this.zero(now.getMinutes())
      }

      this.buttonInit()
    },
    hourPrev () {
      if (Number(this.hour) === 0) this.hour = this.zero(23)
      else this.hour = this.zero(Number(this.hour) - 1)

      this.buttonInit()

      this.$emit('timeChange', this.hour + ':' + this.minute + ':00')
    },
    hourNext () {
      if (Number(this.hour) === 23) this.hour = this.zero(0)
      else this.hour = this.zero(Number(this.hour) + 1)

      this.buttonInit()

      this.$emit('timeChange', this.hour + ':' + this.minute + ':00')
    },
    minutePrev () {
      if (Number(this.minute) === 0) {
        this.hourPrev()
        this.minute = this.zero(59)
      } else this.minute = this.zero(Number(this.minute) - 1)

      this.buttonInit()

      this.$emit('timeChange', this.hour + ':' + this.minute + ':00')
    },
    minuteNext () {
      if (Number(this.minute) === 59) {
        this.hourNext()
        this.minute = this.zero(0)
      } else this.minute = this.zero(Number(this.minute) + 1)

      this.buttonInit()

      this.$emit('timeChange', this.hour + ':' + this.minute + ':00')
    },
    illegalJudge () {
      // 判断是否在begin和end区间之内
      this.isIllegal = false
      this.hourPrevDisabled = false
      this.minutePrevDisabled = false
      this.hourNextDisabled = false
      this.minuteNextDisabled = false
      if (this.begin !== '') {
        let { hour, minute } = this.parseTimeStr(this.begin)
        let temp =
          Number(this.hour) * 60 +
          Number(this.minute) -
          Number(hour) * 60 -
          Number(minute)
        if (temp <= 0) {
          if (temp < 0) this.isIllegal = true
          this.hourPrevDisabled = true
          this.minutePrevDisabled = true
        } else if (temp < 60) this.hourPrevDisabled = true

        if (Number(this.hour) === 23) {
          this.hourNextDisabled = true
          if (Number(this.minute) === 59) {
            this.minuteNextDisabled = true
          }
        }
      }
      if (this.end !== '') {
        let { hour, minute } = this.parseTimeStr(this.end)
        let temp =
          Number(hour) * 60 +
          Number(minute) -
          Number(this.hour) * 60 -
          Number(this.minute)
        if (temp <= 0) {
          if (temp < 0) this.isIllegal = true
          this.hourNextDisabled = true
          this.minuteNextDisabled = true
        } else if (temp < 60) this.hourNextDisabled = true

        if (Number(this.hour) === 0) {
          this.hourPrevDisabled = true
          if (Number(this.minute) === 0) this.minutePrevDisabled = true
        }
      }
    }
  },
  watch: {
    show (val) {
      if (val) this.$emit('timeChange', this.hour + ':' + this.minute + ':00')
      this.showDialog = val
    },

    // 如果外部的begin和end改变了，需要重新初始化
    begin (val) {
      this.init()
    },

    end (val) {
      this.init()
    },

    reset (val) {
      if (val) {
        this.hour = 0
        this.minute = 0
        this.hourPrevDisabled = false
        this.minutePrevDisabled = false
        this.hourNextDisabled = false
        this.minuteNextDisabled = false
        this.showDialog = false
        this.dirty = false
        this.isIllegal = false
        this.hourIllegal = false
        this.minuteIllegal = false
      }

      this.init()
    },

    hour (val, oldVal) {
      if (val !== oldVal && this.dirty) {
        let temp = Number((val + '').replace(/\D/g, ''))
        this.hourIllegal = temp > 23
        this.hour = temp
        this.illegalJudge()
        this.$emit('timeChange', this.hour + ':' + this.minute + ':00')
      }
    },

    minute (val, oldVal) {
      if (val !== oldVal && this.dirty) {
        let temp = Number((val + '').replace(/\D/g, ''))
        this.minuteIllegal = temp > 59
        this.minute = temp
        this.illegalJudge()
        this.$emit('timeChange', this.hour + ':' + this.minute + ':00')
      }
    }
  },
  components: {}
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
.time-dialog {
  background: #f7f7f7;
  width: 162px;
  overflow: hidden;
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.35);
  text-align: center;
  z-index: 1;
  color: #3c3c3c;

  .dos-iconfont {
    font-size: 10px;
  }

  .left-block {
    width: 50%;
    float: left;
  }
  .right-block {
    width: 50%;
    float: right;
  }

  .left-button-block {
    text-align: left;
    padding-left: 26px;
    height: 38px;
    line-height: 38px;

    .input-block {
      padding-left: 17px;
    }
  }

  .right-button-block {
    text-align: left;
    padding-left: 26px;
    height: 38px;
    line-height: 38px;
  }

  .button {
    &:hover {
      cursor: pointer;
    }
  }

  .disabled {
    color: #c0c0c0;
    pointer-events: none !important;
    cursor: default !important;
  }

  .text {
    font-weight: bold;
  }

  input {
    width: 37px !important;
    height: 29px !important;
    text-align: center !important;
    border-radius: 3px !important;
    border: 1px solid #ccc;
    padding: 2px !important;
    color: #3c3c3c !important;
  }

  .has-error {
    input {
      border-color: #f16464;
      &:focus {
        border-color: #f16464;
        outline: 0;
        box-shadow: 0 0 6px rgba(241, 100, 100, 0.3);
      }
    }
  }
}
</style>
