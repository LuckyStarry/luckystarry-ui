import { AxiosInstance } from 'axios'
import ElementUI from 'element-ui'
import Vue, { DirectiveOptions, VueConstructor } from 'vue'
import VueI18n, { LocaleMessageObject, LocaleMessages } from 'vue-i18n'
import VueRouter from 'vue-router'
import VueIcon from 'vue-svgicon'
import { Store } from 'vuex'
import { App } from './app'
import * as builders from './builders'
import { Context } from './context'
import { ElDraggableDialog, Premission, Waves } from './directives'
import * as filters from './filters'
import './icons/components'
import * as interceptors from './interceptors'
import * as lang from './lang'
import { adapters } from './models'
import { IRootState } from './store'

export class Builder {
  private _payload: any = {}
  private _routers!: VueRouter
  private _store!: Store<IRootState>
  private _app!: VueConstructor
  private _context: Context
  private _title!: string
  private _host!: string
  private _logo!: string
  private _axios!: AxiosInstance
  // tslint:disable-next-line: variable-name
  private _axios_config!: { headers: (builders: interceptors.AxiosHeaderBuilder[]) => void; adapter: adapters.ResponseAdapterFactory }
  private _filters: { [key: string]: Function } = Object.assign({}, filters)
  private _messages: LocaleMessages = { zh: lang.zh }

  public constructor(context?: Context) {
    this._context = context || new Context()
    this.app(App)
  }

  public static create(context?: Context): Builder {
    return new Builder(context)
  }

  public router(config: (bd: builders.RouterBuilder) => void, baseURL?: string): Builder {
    if (baseURL) {
      this._context.routes.baseURL = baseURL
    }
    const builder = new builders.RouterBuilder(this._context)
    config(builder)
    this._routers = builder.build()
    return this
  }

  public store(config: (bd: builders.StoreBuilder) => void): Builder {
    const builder = new builders.StoreBuilder(this._context)
    config(builder)
    this._store = builder.build()
    return this
  }

  public extra(config: (payload: any) => void): Builder {
    config(this._payload)
    return this
  }

  public app(app: VueConstructor): Builder {
    this._app = app
    return this
  }

  public title(title: string): Builder {
    this._title = title
    return this
  }

  public host(host: string): Builder {
    this._host = host
    return this
  }

  public axios(
    axios: AxiosInstance,
    config?: { headers?: (builders: interceptors.AxiosHeaderBuilder[]) => void; adapter?: adapters.ResponseAdapterFactory }
  ): Builder {
    this._axios = axios
    this._axios_config = Object.assign({ headers: (x: interceptors.AxiosHeaderBuilder[]) => x, adapter: new adapters.ResponseAdapterFactory() }, config)
    return this
  }

  public filters(filters: { [key: string]: Function }): Builder {
    Object.assign(this._filters, filters)
    return this
  }

  public logo(svgName: string): Builder {
    this._logo = svgName
    return this
  }

  public i18n(name: string, config: (message: LocaleMessageObject) => LocaleMessageObject): Builder {
    const message: LocaleMessageObject = this._messages[name] || {}
    const obj = config(message)
    this._messages[name] = obj || message
    return this
  }

  public build(): Vue {
    if (!this._routers) {
      this.router(() => {})
    }
    if (!this._store) {
      this.store(() => {})
    }
    const router = this._routers
    const store = this._store

    if (this._title) {
      store.state.app.title = this._title
    }
    if (this._logo) {
      store.state.app.logo = this._logo
    }
    if (this._host) {
      store.state.app.host = this._host
    }

    if (this._axios) {
      const interceptor = new interceptors.AxiosInterceptor()
      const headers = [new interceptors.DefaultAxiosHeaderBuilder(store)]
      const config = this._axios_config
      config.headers(headers)
      const context: interceptors.AxiosInterceptContext = {
        store,
        axios: this._axios,
        headers,
        factory: config.adapter
      }
      interceptor.intercept(context)
    }

    {
      const interceptor = new interceptors.RouteInterceptor()
      interceptor.intercept({ store, router: this._routers })
    }

    Vue.use(VueRouter)
    Vue.use(VueI18n)
    Vue.use(ElementUI, { size: store.state.app.size })
    Vue.use(VueIcon, { tagName: 'svg-icon', defaultWidth: '1em', defaultHeight: '1em' })

    const directives = {
      ['permission']: new Premission(store),
      ['waves']: new Waves(),
      ['el-draggable-dialog']: new ElDraggableDialog()
    }

    Object.keys(directives).forEach(key => {
      Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
    })

    Object.keys(this._filters).forEach(key => {
      Vue.filter(key, (this._filters as { [key: string]: Function })[key])
    })

    const i18n = new VueI18n({ locale: 'zh', messages: this._messages })
    const app = new Vue({
      router,
      store,
      i18n,
      ...this._payload,
      render: h => h(this._app)
    })
    return app
  }
}
