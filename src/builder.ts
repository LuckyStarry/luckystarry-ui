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
import { IRootState } from './store'
import { helper, ui } from './utils'

export class Builder {
  private _payload: any = {}
  private _routers!: VueRouter
  private _store!: Store<IRootState>
  private _app!: VueConstructor
  private _process!: ui.Process
  private _message!: ui.Message
  // tslint:disable-next-line: variable-name
  private _message_box!: ui.MessageBox
  private _context: Context
  private _title!: string
  private _host!: string
  private _logo!: string
  private _axios!: AxiosInstance
  private _filters: { [key: string]: Function } = Object.assign({}, filters)
  private _messages: LocaleMessages = { zh: lang.zh }
  // tslint:disable-next-line: variable-name
  private _axios_interceptor!: interceptors.AxiosInterceptor
  // tslint:disable-next-line: variable-name
  private _route_interceptor!: interceptors.RouteInterceptor

  public constructor(context?: Context) {
    this._context = context || new Context()
    this.app(App)
    this.message(new helper.MessageHelper())
    this.messagebox(new helper.MessageBoxHelper())
    this.process(new helper.ProcessHelper())
    this.interceptor(new interceptors.AxiosInterceptor())
    this.interceptor(new interceptors.RouteInterceptor())
  }

  public static create(context?: Context): Builder {
    return new Builder(context)
  }

  public router(config: (bd: builders.RouterBuilder) => void, baseURL?: string): Builder {
    if (baseURL) {
      this._context.routes.baseURL = baseURL
    }
    let builder = new builders.RouterBuilder(this._context)
    config(builder)
    this._routers = builder.build()
    return this
  }

  public store(config: (bd: builders.StoreBuilder) => void): Builder {
    let builder = new builders.StoreBuilder(this._context)
    config(builder)
    this._store = builder.build()
    return this
  }

  public extra(config: (payload: any) => void): Builder {
    config(this._payload)
    return this
  }

  public process(util: ui.Process): Builder {
    this._process = util
    return this
  }

  public message(util: ui.Message): Builder {
    this._message = util
    return this
  }

  public messagebox(util: ui.MessageBox): Builder {
    this._message_box = util
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

  public axios(axios: AxiosInstance, interceptor?: interceptors.AxiosInterceptor): Builder {
    this._axios = axios
    if (interceptor) {
      this._axios_interceptor = interceptor
    }
    return this
  }

  public interceptor(interceptor: interceptors.AxiosInterceptor | interceptors.RouteInterceptor): Builder {
    if (interceptor instanceof interceptors.AxiosInterceptor) {
      this._axios_interceptor = interceptor
    } else {
      this._route_interceptor = interceptor
    }
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
    let message: LocaleMessageObject = this._messages[name] || {}
    let obj = config(message)
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
    let router = this._routers
    let store = this._store

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
      let interceptor = this._axios_interceptor || new interceptors.AxiosInterceptor()
      interceptor.intercept({ message: this._message, messagebox: this._message_box, store, axios: this._axios })
    }

    {
      let interceptor = this._route_interceptor || new interceptors.RouteInterceptor()
      interceptor.intercept({ message: this._message, process: this._process, store, router: this._routers })
    }

    Vue.use(VueRouter)
    Vue.use(VueI18n)
    Vue.use(ElementUI, { size: store.state.app.size })
    Vue.use(VueIcon, { tagName: 'svg-icon', defaultWidth: '1em', defaultHeight: '1em' })

    let directives = {
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

    let i18n = new VueI18n({ locale: 'zh', messages: this._messages })
    let app = new Vue({
      router,
      store,
      i18n,
      ...this._payload,
      render: h => h(this._app)
    })
    return app
  }
}
