import { AxiosInstance } from 'axios'
import ElementUI from 'element-ui'
import { v4 as uuid } from 'uuid'
import Vue, { DirectiveOptions, VueConstructor } from 'vue'
import VueI18n, { LocaleMessageObject, LocaleMessages } from 'vue-i18n'
import VueRouter, { Route } from 'vue-router'
import VueIcon from 'vue-svgicon'
import { Store } from 'vuex'
import { App } from './app'
import * as builders from './builders'
import { Context } from './context'
import { ElDraggableDialog, Premission, Waves } from './directives'
import * as filters from './filters'
import './icons/components'
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

  public constructor(context?: Context) {
    this._context = context || new Context()
    this.app(App)
    this.message(new helper.MessageHelper())
    this.messagebox(new helper.MessageBoxHelper())
    this.process(new helper.ProcessHelper())
  }

  public static create(context?: Context): Builder {
    return new Builder(context)
  }

  public router(config: (bd: builders.RouterBuilder) => void): Builder {
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

  public axios(axios: AxiosInstance): Builder {
    this._axios = axios
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

    axiosInterceptor(this._axios, store, this._message, this._message_box)
    routerInterceptor(router, store, this._process, this._message)

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
    app.$mount('#app')
    return app
  }
}

function axiosInterceptor(axios: AxiosInstance, store: Store<IRootState>, message: ui.Message, messagebox: ui.MessageBox) {
  if (!axios) {
    return
  }
  axios.interceptors.request.use(
    config => {
      if (store.state.user.token) {
        config.headers['Authorization'] = `Berear ${store.state.user.token}`
        config.headers['X-Access-Token'] = store.state.user.token
      }
      config.headers['X-Ca-Nonce'] = uuid()
      return config
    },
    error => {
      // tslint:disable-next-line: no-floating-promises
      Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    response => {
      if (response.status !== 200) {
        switch (response.status) {
          case 401:
            if (messagebox) {
              // tslint:disable-next-line: no-floating-promises
              messagebox
                .confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                  confirmButtonText: '重新登录',
                  cancelButtonText: '取消',
                  type: 'warning'
                })
                .then(async () => {
                  await store.dispatch('user/ResetToken')
                  location.reload()
                })
            }
            break
          case 403:
            if (messagebox) {
              // tslint:disable-next-line: no-floating-promises
              messagebox.alert('您的权限不足', '权限不足', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
            }
            break
        }
      } else {
        let res = response.data
        if (!res.Success) {
          if (message) {
            // tslint:disable-next-line: no-floating-promises
            message.error(res.Message || 'Error')
          }
          return Promise.reject(response.data)
        } else {
          if (res.Message) {
            if (message) {
              // tslint:disable-next-line: no-floating-promises
              message.success(res.Message)
            }
          }
          return response.data
        }
      }
    },
    error => {
      if (message) {
        // tslint:disable-next-line: no-floating-promises
        message.error(error.message || 'Error')
        return Promise.reject(error)
      }
    }
  )
}

function routerInterceptor(router: VueRouter, store: Store<IRootState>, process: ui.Process, message: ui.Message) {
  router.beforeEach(async (to: Route, _: Route, next: any) => {
    if (process) {
      process.start()
    }
    if (store.state.user.token) {
      if (to.path === '/login') {
        next({ path: '/' })
        if (process) {
          process.done()
        }
      } else {
        if (store.state.user.roles.length === 0) {
          try {
            await store.dispatch('user/GetUserInfo')
            const roles = store.state.user.roles
            await store.dispatch('permission/GenerateRoutes', roles)
            router.addRoutes(store.state.permission.dynamic)
            next({ ...to, replace: true })
          } catch (err) {
            await store.dispatch('user/ResetToken')
            if (message) {
              // tslint:disable-next-line: no-floating-promises
              message.error(err || 'Has Error')
            }
            next(`/login?redirect=${to.path}`)
            if (process) {
              process.done()
            }
          }
        } else {
          next()
        }
      }
    } else {
      if (to.meta && to.meta.white) {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
        if (process) {
          process.done()
        }
      }
    }
  })

  router.afterEach((to: Route) => {
    if (process) {
      process.done()
    }
  })
}
