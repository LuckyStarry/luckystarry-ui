import 'luckystarry-collections'
import Vue from 'vue'
import { Builder, Context, contexts } from '../src'
import '../src/styles/index.scss'
import { asyncRoutes } from './router'

Vue.config.productionTip = false

const context = new Context()
context.apis.profile = async () => {
  return { UserID: Date.now().toString(), UserName: 'DEMO', UserAvatar: '', RoleIDs: [] }
}
const builder = Builder.create(context)
builder.router(config => {
  config.addDynamicRoutes(...asyncRoutes)
})
builder.title('织梦者管理平台')
builder.host(process.env.VUE_APP_HOST_URI || '/')
const app = builder.build()
context.oauth.install('simple', new contexts.OAuthClientSimple(`/oauth/callback#access_token=${Date.now()}`, app.$store))
app.$mount('#app')
