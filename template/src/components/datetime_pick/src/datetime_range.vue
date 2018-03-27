<template>
    <div class="datetime-range">
        <datetime-pick v-model="beginDatetime" :begin="beginTimeBegin" :end="beginTimeEnd" :datePlaceholder="'开始日期'"
                       :timePlaceholder="'开始时间'" :showTime="showTime" @dateSelected="startDateSelect"></datetime-pick>
        <span class="range">&nbsp;&nbsp;~&nbsp;&nbsp;</span>
        <datetime-pick v-model="endDatetime" :begin="endTimeBegin" :end="endTimeEnd" :datePlaceholder="'结束日期'"
                       :timePlaceholder="'结束时间'" :showTime="showTime" @dateSelected="endDateSelect"></datetime-pick>
    </div>
</template>

<script>
import datetimePick from './datetime_pick'
export default {
  name: 'gtDatetimeRange',
  props: {
    minRange: {
      type: Number,
      default: 0
    },
    maxRange: {
      type: Number,
      default: 0
    },
    begin: {
      type: String,
      default: ''
    },
    end: {
      type: String,
      default: ''
    },
    min: {
      type: String,
      default: ''
    },
    max: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default () {
        return {
          startTime: '',
          endTime: ''
        }
      }
    },
    showTime: {
      type: Boolean,
      default: true
    },
    includeTime: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      endTimeBegin: this.min,
      endTimeEnd: this.max,
      beginTimeBegin: this.begin,
      beginTimeEnd: this.end,

      startYear: 0,
      startMonth: 0,
      startDate: 0,
      startHour: 0,
      startMinute: 0,
      startSecond: 0,

      endYear: 0,
      endMonth: 0,
      endDate: 0,
      endHour: 0,
      endMinute: 0,
      endSecond: 0,

      startTimeStr: this.value.startTime,
      endTimeStr: this.value.endTime
    }
  },
  created () {
    if (this.min !== '' && this.begin === '') this.beginTimeBegin = this.min
    if (this.max !== '' && this.end === '') this.beginTimeEnd = this.max

    this.init()
  },
  computed: {
    beginDatetime: {
      get () {
        return this.value.startTime
      },
      set (val) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          val
        )
        this.startYear = Number(year)
        this.startMonth = Number(month) - 1
        this.startDate = Number(date)
        this.startHour = Number(hour)
        this.startMinute = Number(minute)
        this.startSecond = Number(second)

        let min = new Date(this.min)
        let max = new Date(this.max)

        let endTimeBegin =
          new Date(
            this.startYear,
            this.startMonth,
            this.startDate,
            this.startHour,
            this.startMinute,
            this.startSecond
          ).valueOf() +
          this.minRange * 1000
        endTimeBegin = new Date(endTimeBegin)
        if (endTimeBegin.valueOf() < min.valueOf()) endTimeBegin = min
        this.endTimeBegin = `${endTimeBegin.getFullYear()}-${this.zero(
          endTimeBegin.getMonth() + 1
        )}-${this.zero(endTimeBegin.getDate())} ${this.zero(
          endTimeBegin.getHours()
        )}:${this.zero(endTimeBegin.getMinutes())}:${this.zero(
          endTimeBegin.getSeconds()
        )}`

        if (this.maxRange !== 0) {
          let endTimeEnd =
            new Date(
              this.startYear,
              this.startMonth,
              this.startDate,
              this.startHour,
              this.startMinute,
              this.startSecond
            ).valueOf() +
            this.maxRange * 1000
          endTimeEnd = new Date(endTimeEnd)
          if (endTimeEnd.valueOf() > max.valueOf()) endTimeEnd = max
          this.endTimeEnd = `${endTimeEnd.getFullYear()}-${this.zero(
            endTimeEnd.getMonth() + 1
          )}-${this.zero(endTimeEnd.getDate())} ${this.zero(
            endTimeEnd.getHours()
          )}:${this.zero(endTimeEnd.getMinutes())}:${this.zero(
            endTimeEnd.getSeconds()
          )}`
        }

        let temp = `${this.startYear}-${this.zero(
          this.startMonth + 1
        )}-${this.zero(this.startDate)}`
        if (this.showTime) temp = temp + ` ${this.zero(this.startHour)}:${this.zero(this.startMinute)}:${this.zero(this.startSecond)}`
        if (!this.showTime && this.includeTime) temp = temp + ' 00:00:00'

        this.startTimeStr = temp
        this.$emit('input', {
          startTime: this.startTimeStr,
          endTime: this.endTimeStr
        })
      }
    },

    endDatetime: {
      get () {
        return this.value.endTime
      },
      set (val) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          val
        )
        this.endYear = Number(year)
        this.endMonth = Number(month) - 1
        this.endDate = Number(date)
        this.endHour = Number(hour)
        this.endMinute = Number(minute)
        this.endSecond = Number(second)

        let min = new Date(this.min)
        let max = new Date(this.max)

        let beginTimeEnd =
          new Date(
            this.endYear,
            this.endMonth,
            this.endDate,
            this.endHour,
            this.endMinute,
            this.endSecond
          ).valueOf() -
          this.minRange * 1000
        beginTimeEnd = new Date(beginTimeEnd)
        if (beginTimeEnd.valueOf() > max) beginTimeEnd = max
        this.beginTimeEnd = `${beginTimeEnd.getFullYear()}-${this.zero(
          beginTimeEnd.getMonth() + 1
        )}-${this.zero(beginTimeEnd.getDate())} ${this.zero(
          beginTimeEnd.getHours()
        )}:${this.zero(beginTimeEnd.getMinutes())}:${this.zero(
          beginTimeEnd.getSeconds()
        )}`

        if (this.maxRange !== 0) {
          let beginTimeBegin =
            new Date(
              this.endYear,
              this.endMonth,
              this.endDate,
              this.endHour,
              this.endMinute,
              this.endSecond
            ).valueOf() -
            this.maxRange * 1000
          beginTimeBegin = new Date(beginTimeBegin)
          if (beginTimeBegin.valueOf() < min) beginTimeBegin = min
          this.beginTimeBegin = `${beginTimeBegin.getFullYear()}-${this.zero(
            beginTimeBegin.getMonth() + 1
          )}-${this.zero(beginTimeBegin.getDate())} ${this.zero(
            beginTimeBegin.getHours()
          )}:${this.zero(beginTimeBegin.getMinutes())}:${this.zero(
            beginTimeBegin.getSeconds()
          )}`
        }

        let temp = `${this.endYear}-${this.zero(this.endMonth + 1)}-${this.zero(
          this.endDate
        )}`
        if (this.showTime) temp = temp + ` ${this.zero(this.endHour)}:${this.zero(this.endMinute)}:${this.zero(this.endSecond)}`
        if (!this.showTime && this.includeTime) temp = temp + ' 24:00:00'

        this.endTimeStr = temp
        this.$emit('input', {
          startTime: this.startTimeStr,
          endTime: this.endTimeStr
        })
      }
    }
  },
  watch: {
    value (v) {
      if (v.startTime) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          v.startTime
        )
        let temp = `${year}-${month}-${date}`
        if (this.showTime) temp = temp + ` ${hour}:${minute}:${second}`
        if (!this.showTime && this.includeTime) temp = temp + ' 00:00:00'

        this.startTimeStr = temp
      }

      if (v.endTime) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          v.endTime
        )
        let temp = `${year}-${month}-${date}`
        if (this.showTime) temp = temp + ` ${hour}:${minute}:${second}`
        if (!this.showTime && this.includeTime) temp = temp + ' 24:00:00'

        this.endTimeStr = temp
      }

      if (v.startTime === '' && v.endTime === '') {
        this.endTimeBegin = this.min
        this.endTimeEnd = this.max
        this.beginTimeBegin = this.begin
        this.beginTimeEnd = this.end

        this.startYear = 0
        this.startMonth = 0
        this.startDate = 0
        this.startHour = 0
        this.startMinute = 0
        this.startSecond = 0

        this.endYear = 0
        this.endMonth = 0
        this.endDate = 0
        this.endHour = 0
        this.endMinute = 0
        this.endSecond = 0

        this.startTimeStr = this.value.startTime
        this.endTimeStr = this.value.endTime
        if (this.min !== '' && this.begin === '') this.beginTimeBegin = this.min
        if (this.max !== '' && this.end === '') this.beginTimeEnd = this.max

        this.init()
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
      if (this.value.startTime) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          this.value.startTime
        )
        this.startYear = Number(year)
        this.startMonth = Number(month) - 1
        this.startDate = Number(date)
        this.startHour = Number(hour)
        this.startMinute = Number(minute)
        this.startSecond = Number(second)

        let min = new Date(this.min)
        let max = new Date(this.max)

        let endTimeBegin =
          new Date(
            this.startYear,
            this.startMonth,
            this.startDate,
            this.startHour,
            this.startMinute,
            this.startSecond
          ).valueOf() +
          this.minRange * 1000
        endTimeBegin = new Date(endTimeBegin)
        if (endTimeBegin.valueOf() < min.valueOf()) endTimeBegin = min
        this.endTimeBegin = `${endTimeBegin.getFullYear()}-${this.zero(
          endTimeBegin.getMonth() + 1
        )}-${this.zero(endTimeBegin.getDate())} ${this.zero(
          endTimeBegin.getHours()
        )}:${this.zero(endTimeBegin.getMinutes())}:${this.zero(
          endTimeBegin.getSeconds()
        )}`

        if (this.maxRange !== 0) {
          let endTimeEnd =
            new Date(
              this.startYear,
              this.startMonth,
              this.startDate,
              this.startHour,
              this.startMinute,
              this.startSecond
            ).valueOf() +
            this.maxRange * 1000
          endTimeEnd = new Date(endTimeEnd)
          if (endTimeEnd.valueOf() > max.valueOf()) endTimeEnd = max
          this.endTimeEnd = `${endTimeEnd.getFullYear()}-${this.zero(
            endTimeEnd.getMonth() + 1
          )}-${this.zero(endTimeEnd.getDate())} ${this.zero(
            endTimeEnd.getHours()
          )}:${this.zero(endTimeEnd.getMinutes())}:${this.zero(
            endTimeEnd.getSeconds()
          )}`
        }

        let temp = `${this.startYear}-${this.zero(
          this.startMonth + 1
        )}-${this.zero(this.startDate)}`
        if (this.showTime) temp = temp + ` ${this.zero(this.startHour)}:${this.zero(this.startMinute)}:${this.zero(this.startSecond)}`
        if (!this.showTime && this.includeTime) temp = temp + ' 00:00:00'

        this.startTimeStr = temp
      }

      if (this.value.endTime) {
        let { year, month, date, hour, minute, second } = this.parseDatetimeObj(
          this.value.endTime
        )
        this.endYear = Number(year)
        this.endMonth = Number(month) - 1
        this.endDate = Number(date)
        this.endHour = Number(hour)
        this.endMinute = Number(minute)
        this.endSecond = Number(second)

        let min = new Date(this.min)
        let max = new Date(this.max)

        let beginTimeEnd =
          new Date(
            this.endYear,
            this.endMonth,
            this.endDate,
            this.endHour,
            this.endMinute,
            this.endSecond
          ).valueOf() -
          this.minRange * 1000
        beginTimeEnd = new Date(beginTimeEnd)
        if (beginTimeEnd.valueOf() > max) beginTimeEnd = max
        this.beginTimeEnd = `${beginTimeEnd.getFullYear()}-${this.zero(
          beginTimeEnd.getMonth() + 1
        )}-${this.zero(beginTimeEnd.getDate())} ${this.zero(
          beginTimeEnd.getHours()
        )}:${this.zero(beginTimeEnd.getMinutes())}:${this.zero(
          beginTimeEnd.getSeconds()
        )}`

        if (this.maxRange !== 0) {
          let beginTimeBegin =
            new Date(
              this.endYear,
              this.endMonth,
              this.endDate,
              this.endHour,
              this.endMinute,
              this.endSecond
            ).valueOf() -
            this.maxRange * 1000
          beginTimeBegin = new Date(beginTimeBegin)
          if (beginTimeBegin.valueOf() < min) beginTimeBegin = min
          this.beginTimeBegin = `${beginTimeBegin.getFullYear()}-${this.zero(
            beginTimeBegin.getMonth() + 1
          )}-${this.zero(beginTimeBegin.getDate())} ${this.zero(
            beginTimeBegin.getHours()
          )}:${this.zero(beginTimeBegin.getMinutes())}:${this.zero(
            beginTimeBegin.getSeconds()
          )}`
        }

        let temp = `${this.endYear}-${this.zero(this.endMonth + 1)}-${this.zero(
          this.endDate
        )}`
        if (this.showTime) temp = temp + ` ${this.zero(this.endHour)}:${this.zero(this.endMinute)}:${this.zero(this.endSecond)}`
        if (!this.showTime && this.includeTime) temp = temp + ' 24:00:00'

        this.endTimeStr = temp
      }
    },

    startDateSelect () {
      this.$emit('startDateSelect')
    },
    endDateSelect () {
      this.$emit('endDateSelect')
    }
  },
  components: {
    datetimePick
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='less' rel='stylesheet/less' scoped>
.datetime-range {
  display: inline-block;
  vertical-align: middle;
}
.range {
  color: #cccccc;
}
</style>
