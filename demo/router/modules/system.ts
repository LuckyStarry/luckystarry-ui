import { AppMain, Layout } from '../../../src'
import { RouteConfig } from 'vue-router'

export const system: RouteConfig = {
  path: '/system',
  component: Layout,
  redirect: 'noredirect',
  name: 'system',
  meta: {
    title: '系统设置',
    icon: 'extra/settings'
  },
  children: [
    {
      path: '/users',
      component: AppMain,
      redirect: 'noredirect',
      name: 'user-home',
      meta: {
        title: '用户管理',
        noCache: true
      },
      children: [
        {
          path: '/users/list',
          component: () => import('../../view/user'),
          name: 'user-list',
          meta: {
            title: '用户列表',
            noCache: true
          }
        }
      ]
    }
  ]
}
