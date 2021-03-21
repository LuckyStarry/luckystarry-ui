import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { IRootState } from '../store'

export interface RouteInterceptContext {
  router: VueRouter
  store: Store<IRootState>
}
