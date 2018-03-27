<template>
    <div class="date-dialog" v-show="showDialog">
        <div class="head">
            <span class="prev iconfont icon-datepick-prev" @click="prev"></span>
            <span class="date-text"><span class="year">{{year}}年</span><span class="month">{{monthString}}月</span>&nbsp;
            </span>&nbsp;&nbsp;&nbsp;
            <span class="next iconfont icon-datepick-next" @click="next"></span>
            <span class="to-today" @click="toToday($event)">今天</span>
        </div>
        <div class="content">
            <table>
                <thead>
                <tr>
                    <td v-for="(week, index) in weeks" class="week" :key='index'>{{week}}</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(day, k1) in days" :key='k1'>
                    <td v-for="(child, k2) in day" :key='k2'>
                <span
                class="text" :class="{'selected': child.selected, 'disabled': child.disabled, 'today': child.today}"
                @click="select(k1, k2, $event)">{{child.day}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'dateDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    weeks: {
      type: Array,
      default: function () {
        return ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      }
    },
    months: {
      type: Array,
      default: function () {
        return [
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12'
        ]
      }
    },
    begin: {
      type: String,
      twoWay: true,
      default: ''
    },
    end: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      year: 0,
      month: 0,
      day: 0,
      days: [],
      today: [],
      monthString: '',
      sep: '',
      showDialog: false,
      autoSelected: true,
      inited: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 日期补零
    zero (n) {
      return n < 10 ? '0' + n : n + ''
    },

    init () {
      let now = new Date()
      if (this.value !== '') {
        if (this.value.indexOf('-') !== -1) {
          this.sep = '-'
        }
        if (this.value.indexOf('.') !== -1) {
          this.sep = '.'
        }
        if (this.value.indexOf('/') !== -1) {
          this.sep = '/'
        }
        let split = this.value.split(this.sep)
        this.year = parseInt(split[0])
        this.month = parseInt(split[1]) - 1
        this.day = parseInt(split[2])
      } else {
        if (this.sep === '') {
          this.sep = '-'
        }
        this.year = now.getFullYear()
        this.month = now.getMonth()
        this.day = now.getDate()
      }
      this.render(this.year, this.month)
    },

    render (y, m) {
      this.today = []
      let firstDayOfMonth = new Date(y, m, 1).getDay() // 当月第一天
      let lastDateOfMonth = new Date(y, m + 1, 0).getDate() // 当月最后一天
      let lastDayOfLastMonth = new Date(y, m, 0).getDate() // 最后一月的最后一天
      this.year = y
      this.monthString = this.months[m]
      let line = 0
      let temp = []
      for (let i = 1; i <= lastDateOfMonth; i++) {
        var dow = new Date(y, m, i).getDay()
        // 第一行
        if (dow === 0) {
          temp[line] = []
        } else if (i === 1) {
          temp[line] = []
          let k = lastDayOfLastMonth - firstDayOfMonth + 1
          for (let j = 0; j < firstDayOfMonth; j++) {
            temp[line].push({
              day: k,
              disabled: true
            })
            k++
          }
        }

        let chk = new Date()
        let chkY = chk.getFullYear()
        let chkM = chk.getMonth()
        let chkD = chk.getDate()
        let dateSplit = this.value.split(this.sep)
        // 匹配上次选中的日期

        // 设置可选范围
        let options = {
          day: i,
          selected: false
        }

        if (
          parseInt(dateSplit[0]) === this.year &&
          parseInt(dateSplit[1]) - 1 === this.month &&
          parseInt(dateSplit[2]) === i
        ) {
          options.selected = true && this.autoSelected
        } else if (
          chkY === this.year &&
          chkM === this.month &&
          i === this.day &&
          this.value === ''
        ) {
          options.selected = true && this.autoSelected
        }

        if (chkY === this.year && chkM === this.month && i === chkD) this.today = [line, temp[line].length]

        // 设置可选范围
        if (this.begin !== '') {
          let beginSplit = this.begin.split(this.sep)
          let beginTime = Number(
            new Date(
              parseInt(beginSplit[0]),
              parseInt(beginSplit[1]) - 1,
              parseInt(beginSplit[2])
            )
          )
          if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
        }
        if (this.end !== '') {
          let endSplit = this.end.split(this.sep)
          let endTime = Number(
            new Date(
              parseInt(endSplit[0]),
              parseInt(endSplit[1]) - 1,
              parseInt(endSplit[2])
            )
          )
          if (endTime < Number(new Date(this.year, this.month, i))) options.disabled = true
        }
        temp[line].push(options)

        // 最后一行
        if (dow === 6) {
          line++
        } else if (i === lastDateOfMonth) {
          let k = 1
          for (dow; dow < 6; dow++) {
            temp[line].push({
              day: k,
              disabled: true
            })
            k++
          }
        }
      }

      let now = new Date()
      if (this.today.length === 2) temp[this.today[0]][this.today[1]].today = this.year === now.getFullYear() && this.month === now.getMonth()
      this.days = temp
    },

    select (k1, k2, $event) {
      if ($event !== undefined) $event.stopPropagation()

      // 取消上次选中
      this.days.forEach(v => {
        v.forEach(vv => {
          vv.selected = false
        })
      })
      // 设置当前选中天
      this.days[k1][k2].selected = true
      this.day = this.days[k1][k2].day

      this.autoSelected = true

      this.$emit('selected')
      this.$emit(
        'dateChange',
        '' +
          this.year +
          this.sep +
          this.zero(this.month + 1) +
          this.sep +
          this.zero(this.day)
      )
    },

    toToday ($event) {
      let now = new Date()
      if (this.month !== now.getMonth() || this.year !== now.getFullYear()) {
        this.month = now.getMonth()
        this.year = now.getFullYear()
        this.render(this.year, this.month)
      }
      if ($event !== undefined) $event.stopPropagation()

      // 取消上次选中
      this.days.forEach(v => {
        v.forEach(vv => {
          vv.selected = false
        })
      })
      // 设置当前选中天
      this.days[this.today[0]][this.today[1]].selected = true
      this.day = this.days[this.today[0]][this.today[1]].day
      this.$emit(
        'dateChange',
        '' +
          this.year +
          this.sep +
          this.zero(this.month + 1) +
          this.sep +
          this.zero(this.day)
      )
    },

    prev () {
      if (this.month === 0) {
        this.month = 11
        this.year = this.year - 1
      } else this.month = this.month - 1

      this.autoSelected = false
      this.render(this.year, this.month)
    },

    next () {
      if (this.month === 11) {
        this.month = 0
        this.year = this.year + 1
      } else this.month = this.month + 1

      this.autoSelected = false
      this.render(this.year, this.month)
    }
  },
  watch: {
    show (val) {
      if (val && !this.inited) {
        // this.$emit('dateChange', '' + this.year + this.sep + this.zero(this.month + 1) + this.sep + this.zero(this.day))
        this.inited = true
      }

      if (val) {
        this.init()
      }
      this.showDialog = val
    },

    // 如果外部的begin和end改变了，需要重新初始化
    begin (val) {
      this.init()
    },

    end (val) {
      this.init()
    },

    value (val, valOld) {
      if (val === '' && valOld !== '') {
        this.year = 0
        this.month = 0
        this.day = 0
        this.days = []
        this.today = []
        this.monthString = ''
        this.sep = ''
        this.showDialog = false
        this.autoSelected = true
        this.inited = false
      }
      this.init()
    }
  },
  components: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
    .date-dialog {
        width: 312px;
        background: #f7f7f7;
        box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.35);
        z-index: 1;
        color: #3c3c3c;
        .head {
            padding: 13px 20px;
            font-weight: bold;
            overflow: hidden;
            text-align: left;

            .date-text {
                margin-left: 36px;
            }

            .dos-iconfont {
                font-size: 15px;
            }

            .prev {
                float: left;

                &:hover {
                    cursor: pointer;
                }
            }

            .next {
                float: right;

                &:hover {
                    cursor: pointer;
                }
            }

            .to-today {
                font-weight: normal;
                color: #01acf3;
                float: right;
                padding-right: 36px;
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .content {
            padding: 0 !important;
            table {
                thead {
                    font-weight: bold;

                    .week {
                        font-size: 14px;
                        color: #3c3c3c
                    }
                }
                margin: auto;
                position: relative;
                left: 6px;
                .text {
                    margin: 5px;
                    padding: 5px 7px;
                    display: block;
                    border-radius: 3px;
                    text-align: center;

                    &:hover {
                        cursor: pointer;
                        background: #ccc;
                    }
                }
                .today {
                    border: 1px dashed #50caff;

                    &:hover {
                        border: 1px solid #ccc;
                    }
                }
                .disabled {
                    color: #c0c0c0;
                    pointer-events: none !important;
                    cursor: default !important;
                }
                .selected {
                    background: #01acf3;
                    border: 1px solid #01acf3;

                    &:hover {
                        background: #01acf3;
                    }
                }
            }
        }
    }
</style>
