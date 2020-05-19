import { App } from './app'
import { Builder } from './builder'
import { Context } from './context'
import { AppMain, Layout } from './layout'
import * as mixins from './mixins'
import * as models from './models'
import * as store from './store'
import * as utils from './utils'
export { models }
export { utils }
export { Builder }
export { Context }
export { store }
export { mixins }
export { App }
export { Layout }
export { AppMain }
const components = { App, Layout }
const LSUI: any = Object.assign({}, components)
const install = function(Vue: any, opts?: any) {
  if ((install as any).installed) return

  Object.keys(components).forEach(component => {
    Vue.component(component, component)
  })
}
// tslint:disable-next-line: strict-type-predicates
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
LSUI.install = install
export default LSUI
declare global {
  interface Date {
    toSmartString(): string
  }
}

Date.prototype.toSmartString = function() {
  return utils.times.utils.toSmartString(this)
}
