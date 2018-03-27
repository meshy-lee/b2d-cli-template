<template>
    <div class="datetime-range-select">
        <datetime-range v-model="model" :showTime="false" @startDateSelect="startDateSelect" @endDateSelect="endDateSelect"
                        :minRange="minRange" :maxRange="maxRange" :begin="begin" :end="end" :min="min" :max="max"></datetime-range>
        <span class="select-item today" @click="selectDateTime('today')" :class="{'selected': type === 'today'}">今天</span>
        <!-- <span class="select-item yesterday" @click="selectDateTime('yesterday')" :class="{'selected': type === 'yesterday'}">昨天</span> -->
        <span class="select-item" @click="selectDateTime('last7')" :class="{'selected': type === 'last7'}">7天</span>
        <!-- <span class="select-item" @click="selectDateTime('last14')" :class="{'selected': type === 'last14'}">14天</span> -->
        <span class="select-item" @click="selectDateTime('last30')" :class="{'selected': type === 'last30'}">30天</span>
    </div>
</template>

<script>
import datetimeRange from './datetime_range'

let now = new Date()
let nowStr = `${now.getFullYear()}-${now.getMonth() +
  1}-${now.getDate()} 24:00:00`
let lastMonthStr
if (now.getMonth() === 0) lastMonthStr = `${now.getFullYear() - 1}-12-${now.getDate()} 00:00:00`
else lastMonthStr = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} 00:00:00`

export default {
  name: 'gtDatetimeRangeSelect',
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
      default: lastMonthStr
    },
    max: {
      type: String,
      default: nowStr
    },
    value: {
      type: Object,
      default () {
        return {
          startTime: '',
          endTime: ''
        }
      }
    }
  },
  data () {
    return {
      model: this.value,
      startTimeSelected: false,
      endTimeSelected: false,
      type: ''
    }
  },
  created () {
    if (this.value.startTime !== '') this.startTimeSelected = true
    if (this.value.endTime !== '') this.endTimeSelected = true
  },
  methods: {
    zero (n) {
      return n < 10 ? '0' + n : n + ''
    },
    selectDateTime (type) {
      this.type = type
      let now = new Date()
      now = new Date(now.valueOf() - 60 * 60 * 24 * 1000)
      let yesterday = new Date(now.valueOf() - 60 * 60 * 24 * 1000)
      let last7 = new Date(now.valueOf() - 60 * 60 * 24 * 1000 * 6)
      let last14 = new Date(now.valueOf() - 60 * 60 * 24 * 1000 * 13)
      let last30 = new Date(now.valueOf() - 60 * 60 * 24 * 1000 * 29)

      switch (type) {
        case 'today':
          this.model = {
            startTime: `${this.zero(now.getFullYear())}-${this.zero(
              now.getMonth() + 1
            )}-${this.zero(now.getDate())} 00:00:00`,
            endTime: `${this.zero(now.getFullYear())}-${this.zero(
              now.getMonth() + 1
            )}-${this.zero(now.getDate())} 24:00:00`
          }
          break
        case 'yesterday':
          this.model = {
            startTime: `${this.zero(yesterday.getFullYear())}-${this.zero(
              yesterday.getMonth() + 1
            )}-${this.zero(yesterday.getDate())} 00:00:00`,
            endTime: `${this.zero(yesterday.getFullYear())}-${this.zero(
              yesterday.getMonth() + 1
            )}-${this.zero(yesterday.getDate())} 24:00:00`
          }
          break
        case 'last7':
          this.model = {
            startTime: `${this.zero(last7.getFullYear())}-${this.zero(
              last7.getMonth() + 1
            )}-${this.zero(last7.getDate())} 00:00:00`,
            endTime: `${this.zero(now.getFullYear())}-${this.zero(
              now.getMonth() + 1
            )}-${this.zero(now.getDate())} 24:00:00`
          }
          break
        case 'last14':
          this.model = {
            startTime: `${this.zero(last14.getFullYear())}-${this.zero(
              last14.getMonth() + 1
            )}-${this.zero(last14.getDate())} 00:00:00`,
            endTime: `${this.zero(now.getFullYear())}-${this.zero(
              now.getMonth() + 1
            )}-${this.zero(now.getDate())} 24:00:00`
          }
          break
        case 'last30':
          this.model = {
            startTime: `${this.zero(last30.getFullYear())}-${this.zero(
              last30.getMonth() + 1
            )}-${this.zero(last30.getDate())} 00:00:00`,
            endTime: `${this.zero(now.getFullYear())}-${this.zero(
              now.getMonth() + 1
            )}-${this.zero(now.getDate())} 24:00:00`
          }
          break
      }

      this.startTimeSelected = true
      this.endTimeSelected = true
      this.$emit('input', this.model)
    },

    startDateSelect () {
      this.type = ''
      this.startTimeSelected = true
      if (this.endTimeSelected) this.$emit('input', this.model)
    },

    endDateSelect () {
      this.type = ''
      this.endTimeSelected = true
      if (this.startTimeSelected) this.$emit('input', this.model)
    }
  },
  watch: {
    value (val) {
      if (val.startTime === '' && val.endTime === '') {
        this.model = val
        this.startTimeSelected = false
        this.endTimeSelected = false
      }
    }
  },
  components: {
    datetimeRange
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less" scoped>
.datetime-range-select {
  display: inline-block;

  & > span {
    color: #333333;
  }

  .select-item {
    margin-left: 10px;
    display: inline-block;
    border-radius: 3px;
    padding: 2px 0;
    width: 40px;
    text-align: center;
    color: #cccccc;

    &:hover {
      cursor: pointer;
      background: #01acf3;
      color: #fff;
    }
  }

  .selected {
    background: #01acf3;
    color: #fff;
  }
}
</style>
