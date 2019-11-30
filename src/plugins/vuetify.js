import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        layoutBar: '#009688', // 主题色
        primary: '#009688', // 主题色
        layoutBg: '#E6A23C',
        primaryText: '#ffffff',
        secondText: '#909399',
        primaryIcon: '#ffffff',
        divider: '#E6A23C',
        bgColor: '#ffffff',

        localeS: '#009688',
        localex: '#909399',
        localeD: '#909399',

        success: '#34a853',
        info: '#909399',
        warning: '#E6A23C',
        danger: '#F56C6C'
      }
    }
  }
}

export default new Vuetify(opts)
