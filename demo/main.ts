import 'luckystarry-collections'
import Vue from 'vue'
import { Builder, Context, contexts } from '../src'
import '../src/styles/index.scss'
import { asyncRoutes } from './router'

Vue.config.productionTip = false

const context = new Context()
context.apis.profile = async () => {
  return { UserID: Date.now().toString(), UserName: 'DEMO', UserAvatar: '//cdn.luckystarry.com/avatar/6B79QJ7UL0JK.jpeg', RoleIDs: [] }
}
const builder = Builder.create(context)
builder.router(config => {
  config.addConstantRoutes({
    path: '/authorize',
    component: () => import('./view/login'),
    name: 'authorize',
    meta: {
      title: '正在登陆……',
      hidden: true,
      white: true
    }
  })
  config.addDynamicRoutes(...asyncRoutes)
})
builder.title('织梦者管理平台')
builder.host(process.env.VUE_APP_HOST_URI || '')
const app = builder.build()
context.oauth.install('simple', new contexts.OAuthClientSimple(`/authorize`, app.$store))
app.$mount('#app')
