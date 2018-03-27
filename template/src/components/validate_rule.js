/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
import VeeValidate, {Validator} from 'vee-validate'
const dictionary = {
  en: {
    messages: {
      required: () => '不能为空',
      min: () => '长度不能少于4位',
      max: () => '长度不能超过20位字符',
      confirmed: () => '两次密码输入不一致',
      alpha_num: () => '必须由数字或字母组成',
      email: () => '请输入合法的邮箱',
      phone: () => '请输入正确的手机号码',
      halfAngle: () => '密码不能包含全角字符',
      realName: () => '不能包含数字或者空格',
      urlHeader: () => '有效可访问链接以http://或https://开头'
    }
  }
}
Validator.extend('registerPassword', {
  getMessage: '',
  messages: {
    en: (field, args) => '请输入8-32位密码(须包含字母,数字和标点符号)',
    cn: (field, args) => '请输入8-32位密码(须包含字母,数字和标点符号)'
  },
  validate: value => {
    let bol1 = /[\d]/g.test(value)
    let bol2 = /[A-Za-z]/g.test(value)
    let bol3 = /[~`!@#\$%\^&\*\(\)\+_\{\}\[\]:"'\\\|\<\>\?,\.\/]/.test(value)
    let bol4 = value.length >= 8 && value.length <= 32
    if (bol1 && bol2 && bol3 && bol4) return true
    else return false
  }
})
Validator.extend('phone', {
  getMessage: '',
  messages: {
    cn: (field, args) => '请输入正确的手机号码'
  },
  validate: value => {
    return /^1[34578]\d{9}$/.test(value)
  }
}) // 自定义校验规则

Validator.extend('halfAngle', {
  getMessage: '',
  messages: {
    cn: (field, args) => '密码不能包含全角字符'
  },
  validate: value => {
    return /^[\x00-\xff]*$/.test(value)
  }
}) // 自定义校验规则

Validator.extend('realName', { // not number
  getMessage: '',
  messages: {
    cn: (field, args) => '不能包含数字或者空格'
  },
  validate: value => { // 字母和汉字
    return /^([\u4E00-\u9FA5]|[A-Za-z])+$/.test(value)
  }
}) // 自定义校验规则

Validator.extend('urlHeader', {
  getMessage: '',
  messages: {
    cn: (field, args) => '有效可访问链接以http://或https://开头'
  },
  validate: value => { // 以http://或https://开头
    return /^(http[s]?):\/\//.test(value)
  }
})

Validator.localize(dictionary) // 自定义内置规则的错误信息
