import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { IRootState } from '../store'
import { ui } from '../utils'

export interface RouteInterceptContext {
  message: ui.Message
  process: ui.Process
  router: VueRouter
  store: Store<IRootState>
}
