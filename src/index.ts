import { App } from './app'
import { Builder } from './builder'
import * as components from './components'
import { Context } from './context'
import * as contexts from './contexts'
import * as interceptors from './interceptors'
import { AppMain, Layout } from './layout'
import * as mixins from './mixins'
import * as models from './models'
import * as store from './store'
import './styles/index.scss'
import * as ui from './ui'
import * as utils from './utils'
export { App }
export { AppMain }
export { Builder }
export { Context }
export { Layout }
export { components }
export { contexts }
export { interceptors }
export { mixins }
export { models }
export { store }
export { ui }
export { utils }
const _components = { App, Layout, AppMain }
const install = function(Vue: any, opts?: any) {
  if ((install as any).installed) return

  Object.keys(_components).forEach(component => {
    Vue.component(component, component)
  })
  Object.keys(components).forEach(component => {
    Vue.component(component, component)
  })
}
// tslint:disable-next-line: strict-type-predicates
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default { App, AppMain, Builder, Context, Layout, components, mixins, models, store, utils, install }
declare global {
  interface Date {
    toSmartString(): string
    toDate(): Date
  }
}

Date.prototype.toSmartString = function() {
  return utils.times.utils.toSmartString(this)
}

Date.prototype.toDate = function() {
  return new Date(Math.floor(this.getTime() / 86400000) * 86400000)
}
