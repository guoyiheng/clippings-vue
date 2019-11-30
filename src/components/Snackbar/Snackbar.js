import Vue from 'vue'
import MessageComponent from './Snackbar.vue'

// 生成一个Vue的子类
// 同时这个子类也就是组件
const MessageConstructor = Vue.extend(MessageComponent)

const instance = new MessageConstructor().$mount()

const Message = ({ color, mode, text, duration, x, y, showClose }) => {
  color && (instance.color = color)
  mode && (instance.mode = mode)
  text && (instance.text = text)
  duration && (instance.timeout = duration)
  x && (instance.x = x)
  y && (instance.y = y)
  showClose && (instance.showClose = showClose)

  document.getElementById('message-slot').appendChild(instance.$el)
  instance.snackbar = true
}

export default Message
