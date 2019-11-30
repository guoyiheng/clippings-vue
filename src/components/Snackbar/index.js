import Vue from 'vue'
import MessageComponent from './Snackbar.vue'

// 生成一个Vue的子类
// 同时这个子类也就是组件
const MessageConstructor = Vue.extend(MessageComponent)

const instance = new MessageConstructor().$mount()

const Message = ({ color, mode, text, duration, showClose, x, y }) => {
  color && (instance.color = color)
  mode && (instance.mode = mode)
  text && (instance.text = text)
  duration && (instance.timeout = duration)
  showClose && (instance.showClose = showClose)
  x && (instance.x = x)
  y && (instance.y = y)

  document.getElementById('message-slot').appendChild(instance.$el)
  instance.snackbar = true
}

const install = Vue => {
  Vue.prototype.$message = Message
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default install
