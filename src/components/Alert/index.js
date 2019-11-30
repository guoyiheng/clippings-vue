// 使用组件，插件icons显示有误，有空提个issues

import Vue from 'vue'
import AlertComponent from './Alert.vue'

// 生成一个Vue的子类
// 同时这个子类也就是组件
const AlertConstructor = Vue.extend(AlertComponent)

const newAlert = new AlertConstructor()
const instance = newAlert.$mount()

const Alert = ({ type, text, duration }) => {
  type && (instance.type = type)
  text && (instance.text = text)

  if (!duration) {
    duration = 3000
  }

  document.getElementById('message-slot').appendChild(instance.$el)

  instance.show = true

  const t1 = setTimeout(() => {
    clearTimeout(t1)
    instance.show = false // 隐藏提示组件
  }, duration)
}

const install = Vue => {
  Vue.prototype.$alert = Alert
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default install
