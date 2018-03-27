import gtDatePick from './src/date_pick'
import gtTimePick from './src/time_pick'
import gtDatetimePick from './src/datetime_pick'
import gtDatetimeRange from './src/datetime_range'
import gtDatetimeRangeSelect from './src/datetime_range_select'

gtDatePick.install = function (Vue) {
  Vue.component(gtDatePick.name, gtDatePick)
}
gtTimePick.install = function (Vue) {
  Vue.component(gtTimePick.name, gtTimePick)
}
gtDatetimePick.install = function (Vue) {
  Vue.component(gtDatetimePick.name, gtDatetimePick)
}
gtDatetimeRange.install = function (Vue) {
  Vue.component(gtDatetimeRange.name, gtDatetimeRange)
}
gtDatetimeRangeSelect.install = function (Vue) {
  Vue.component(gtDatetimeRangeSelect.name, gtDatetimeRangeSelect)
}

export {gtDatePick, gtTimePick, gtDatetimePick, gtDatetimeRange, gtDatetimeRangeSelect}
