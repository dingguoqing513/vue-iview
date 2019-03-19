import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/components/homePage.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/components/UserComponent/user.vue')
        },
        {
          path: '/attend',
          name: 'attend',
          component: () => import('@/components/AttendComponent/attendance.vue')
        },
        {
          path: '/payroll',
          name: 'payroll',
          component: () => import('@/components/PayrollComponent/payroll.vue')
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/components/SettingComponent/setting.vue')
        }
      ]
    }
  ]
})
