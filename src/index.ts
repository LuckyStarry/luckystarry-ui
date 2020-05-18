import { App } from './app'
import { AppMain, Layout } from './layout'
export { Builder } from './builder'
export { App }
export { Layout }
export { AppMain }
const components = { App, Layout }
const ls: any = Object.assign({}, components)
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
ls.install = install
export default ls
