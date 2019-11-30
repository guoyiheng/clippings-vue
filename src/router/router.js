import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Layout = () => import('@/views/layout/layout')

const Login = () => import('@/views/login/login')
const Activation = () => import('@/views/login/activation')

const Home = () => import('@/views/user/home')
const Files = () => import('@/views/user/files')
const Clippings = () => import('@/views/user/clippings')
const Favorite = () => import('@/views/user/favorite')
const Help = () => import('@/views/user/help')
const Setting = () => import('@/views/user/setting')
const Trash = () => import('@/views/user/trash')

const NotFund = () => import('@/views/404')

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/clippings/index'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
        level: 0
      }
    },
    {
      path: '/activation',
      name: 'Activation',
      component: Activation,
      meta: {
        title: '激活',
        level: 0
      }
    },
    {
      path: '/clippings',
      component: Layout,
      children: [
        {
          path: 'home',
          component: Home,
          name: 'Home',
          meta: {
            title: '个人中心',
            level: 1
          }
        }
      ]
    },
    {
      path: '/clippings',
      component: Layout,
      children: [
        {
          path: 'files',
          component: Files,
          name: 'Files',
          meta: {
            title: '文件',
            level: 1
          }
        }
      ]
    },
    {
      path: '/clippings',
      component: Layout,
      children: [
        {
          path: 'favorite',
          component: Favorite,
          name: 'Favorite',
          meta: {
            title: '我喜欢',
            level: 1
          }
        }
      ]
    },
    {
      path: '/clippings',
      component: Layout,
      children: [
        {
          path: 'index',
          component: Clippings,
          name: 'Clippings',
          meta: {
            title: '剪报',
            level: 1
          }
        }
      ]
    },
    {
      path: '/clippings',
      component: Layout,
      children: [
        {
          path: 'help',
          component: Help,
          name: 'Help',
          meta: {
            title: '帮助',
            level: 1
          }
        }
      ]
    },
    {
      path: '/clippings',
      component: Layout,
      children: [
        {
          path: 'setting',
          component: Setting,
          name: 'Setting',
          meta: {
            title: '设置',
            level: 1
          }
        }
      ]
    },
    {
      path: '/clippings',
      component: Layout,
      children: [
        {
          path: 'trash',
          component: Trash,
          name: 'Trash',
          meta: {
            title: '垃圾箱',
            level: 1
          }
        }
      ]
    },
    {
      path: '/404',
      name: 'NotFund',
      component: NotFund,
      meta: {
        title: '404NotFund',
        level: 0
      }
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404' }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
