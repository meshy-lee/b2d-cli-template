<template>
    <div class="datetime-pick">
        <date-pick class="date-pick" :class="{'only-date': !showTime}" v-model="dateModel" @selected="dateSelected" :begin="beginDate" :end="endDate"
                   :placeholder="datePlaceholder" :disabled="disabled"></date-pick>
        <time-pick class="time-pick" v-model="timeModel" :show="show" :begin="beginTime" :end="endTime"
                   :placeholder="timePlaceholder" v-if="showTime" :disabled="disabled" @selected="timeSelected"></time-pick>
    </div>
</template>

<script>
import datePick from './date_pick'
import timePick from './time_pick'
export default {
  name: 'gtDatetimePick',
  props: {
    begin: {
      type: String,
      default: ''
    },
    end: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    showTime: {
      type: Boolean,
      default: true
    },
    datePlaceholder: {
      type: String,
      default: '请选择日期'
    },
    timePlaceholder: {
      type: String,
      default: '请选择时间'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      beginDate: '',
      beginTime: '',
      endDate: '',
      endTime: '',
      defaultDate: '',
      defaultTime: '',
      year: 0,
      month: 0,
      date: 0,
      hour: 0,
      minute: 0,
      second: 0,

      show: false,
      timeDialogShowed: false
    }
  },
  created () {
    this.init()
  },
  computed: {
    dateModel: {
      get () {
        if (this.value !== '') return `${this.zero(this.year)}-${this.zero(this.month + 1)}-${this.zero(this.date)}`
        else return ''
      },
      set (val) {
        let [year, month, date] = val.split('-')
        this.year = Number(year)
        this.month = Number(month) - 1
        this.date = Number(date)
        if (this.begin) {
          let {
            year,
            month,
            date,
            hour,
            minute,
            second
          } = this.parseDatetimeObj(this.begin)
          this.beginDate = '' + year + '-' + month + '-' + date
          if (
            this.year === Number(year) &&
            this.month === Number(month) - 1 &&
            this.date === Number(date)
          ) {
            if (this.showTime) this.beginTime = hour + ':' + minute + ':' + second
          } else this.beginTime = ''
        }

        if (this.end) {
          let {
            year,
            month,
            date,
            hour,
            minute,
            second
          } = this.parseDatetimeObj(this.end)
          this.endDate = '' + year + '-' + month + '-' + date
          if (
            this.year === Number(year) &&
            this.month === Number(month) - 1 &&
            this.date === Number(date)
          ) {
            if (this.showTime) this.endTime = hour + ':' + minute + ':' + second
          } else this.endTime = ''
        }

        this.emitChange()
      }
    },
    timeModel: {
      get () {
        if (this.value !== '') return `${this.zero(this.hour)}:${this.zero(this.minute)}:${this.zero(this.second)}`
        else return ''
      },
      set (val) {
        let [hour, minute, second] = val.split(':')
        this.hour = Number(hour)
        this.minute = Number(minute)
        this.second = Number(second)

        this.emitChange()
      }
    },

    model: {
      get () {
        if (this.showTime) return `${this.zero(this.year)}-${this.zero(this.month + 1)}-${this.zero(this.date)} ${this.zero(this.hour)}:${this.zero(this.minute)}:${this.zero(this.second)}`
        else return `${this.zero(this.year)}-${this.zero(this.month + 1)}-${this.zero(this.date)}`
      },

      set (val) {
        if (val) {
          let {
            year,
            month,
            date,
            hour,
            minute,
            second
          } = this.parseDatetimeObj(val)
          this.defaultDate = '' + year + '-' + month + '-' + date
          this.year = Number(year)
          this.month = Number(month) - 1
          this.date = Number(date)
          if (this.showTime) {
            this.defaultTime = hour + ':' + minute + ':' + second
            this.hour = Number(hour)
            this.minute = Number(minute)
            this.second = Number(second)
          }
        } else {
          let now = new Date()
          this.year = now.getFullYear()
          this.month = now.getMonth()
          this.date = now.getDate()
          if (this.showTime) {
            this.hour = now.getHours()
            this.minute = now.getMinutes()
            this.second = now.getSeconds()
          }
        }
        this.emitChange()
      }
    }
  },
  methods: {
    // 日期补零
    zero (n) {
      return n < 10 ? '0' + n : n + ''
    },
    // 解析时间字符串
    parseDatetimeObj (o) {
      if (typeof o === 'string') {
        let s = o
        let sep = '-'
        if (s.indexOf('-') !== -1) sep = '-'
        if (s.indexOf('.') !== -1) sep = '.'
        if (s.indexOf('/') !== -1) sep = '/'

        let dateSplit = s.split(' ')[0].split(sep)
        let timeSplit = s.split(' ')[1]
          ? s.split(' ')[1].split(':')
          : undefined
        let [year, month, date] = dateSplit
        if (!this.showTime || !timeSplit) timeSplit = ['00', '00', '00']
        let [hour, minute, second] = timeSplit

        return {
          year: this.zero(Number(year)),
          month: this.zero(Number(month)),
          date: this.zero(Number(date)),
          hour: this.zero(Number(hour)),
          minute: this.zero(Number(minute)),
          second: this.zero(Number(second))
        }
      } else {
        if (o instanceof Date) {
          return {
            year: this.zero(o.getFullYear()),
            month: this.zero(o.getMonth() + 1),
            date: this.zero(o.getDate()),
            hour: this.zero(o.getHours()),
            minute: this.zero(o.getMinutes()),
            second: this.zero(o.getSeconds())
          }
        }
      }
    },

    init () {
      if (this.value) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          this.value
        )
        this.defaultDate = '' + year + '-' + month + '-' + date
        this.year = Number(year)
        this.month = Number(month) - 1
        this.date = Number(date)
        if (this.showTime) {
          this.defaultTime = hour + ':' + minute + ':' + second
          this.hour = Number(hour)
          this.minute = Number(minute)
          this.second = Number(second)
        }
      } else {
        let now = new Date()
        this.year = now.getFullYear()
        this.month = now.getMonth()
        this.date = now.getDate()
        if (this.showTime) {
          this.hour = now.getHours()
          this.minute = now.getMinutes()
          this.second = now.getSeconds()
        }
      }

      if (this.begin) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          this.begin
        )
        this.beginDate = '' + year + '-' + month + '-' + date
        if (
          this.year === Number(year) &&
          this.month === Number(month) - 1 &&
          this.date === Number(date)
        ) {
          if (this.showTime) this.beginTime = hour + ':' + minute + ':' + second
        } else this.beginTime = ''
      }
      if (this.end) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          this.end
        )
        this.endDate = '' + year + '-' + month + '-' + date
        if (
          this.year === Number(year) &&
          this.month === Number(month) - 1 &&
          this.date === Number(date)
        ) {
          if (this.showTime) this.endTime = hour + ':' + minute + ':' + second
        } else this.endTime = ''
      }
    },

    emitChange () {
      if (this.showTime && this.timeDialogShowed) {
        this.$emit(
          'input',
          `${this.zero(this.year)}-${this.zero(this.month + 1)}-${this.zero(
            this.date
          )} ${this.zero(this.hour)}:${this.zero(this.minute)}:${this.zero(
            this.second
          )}`
        )
      } else {
        this.$emit(
          'input',
          `${this.zero(this.year)}-${this.zero(this.month + 1)}-${this.zero(
            this.date
          )}`
        )
      }
    },

    dateSelected () {
      if (this.showTime) {
        this.show = true // 通知time组件显示
        setTimeout(() => {
          // 等待一定时间之后重新设为false
          this.show = false
        }, 100)
      }

      this.$emit('dateSelected')
    },
    timeSelected () {
      this.timeDialogShowed = true
    }
  },
  watch: {
    begin (v) {
      if (v) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          v
        )
        this.beginDate = '' + year + '-' + month + '-' + date
        if (this.showTime) this.beginTime = hour + ':' + minute + ':' + second
      }
    },
    end (v) {
      if (v) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          v
        )
        this.endDate = '' + year + '-' + month + '-' + date
        if (this.showTime) this.endTime = hour + ':' + minute + ':' + second
      }
    },

    show (v) {
      if (v) {
        this.timeDialogShowed = true
      }
    },

    value (v) {
      this.init()
    }
  },
  components: {
    datePick,
    timePick
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='less' rel="stylesheet/less" scoped>
.datetime-pick {
  display: inline-block;
  vertical-align: middle;
  .date-pick {
    float: left;
    margin-right: 14px;
  }
  .time-pick {
    float: left;
  }
  .only-date {
    margin-right: 0;
  }
}
</style>
