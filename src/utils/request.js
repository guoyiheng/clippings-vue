import axios from 'axios'
import { getToken } from '@/utils/auth'
import Message from '@/components/Snackbar/Snackbar.js'
import store from '@/store'
import router from '@/router/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 300000 // request timeout 5min
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.

    if (res.code === 401) {
      Message({
        text: res.msg || 'error',
        color: 'error'
      })
      store
        .dispatch('user/resetToken')
        .then(() => {
          const t1 = setTimeout(() => {
            clearTimeout(t1)
            router.replace({ path: '/login' })
          }, 1500)
        })
        .catch(error => {
          console.log(error)
        })
      return Promise.reject(res.msg || 'error')
    } else if (res.code !== 200) {
      Message({
        text: res.msg || 'error',
        color: 'error'
      })
      return Promise.reject(res.msg || 'error')
    } else {
      return res
    }
  },
  error => {
    Message({
      text: error.msg || 'error',
      color: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
