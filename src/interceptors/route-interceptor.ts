import { Message } from 'element-ui'
import nprogress from 'nprogress'
import { NavigationGuard, Route } from 'vue-router'
import { RouteInterceptContext } from './route-intercept-context'

export class RouteInterceptor {
  private config: { login: NavigationGuard }
  public constructor(config?: { login: NavigationGuard }) {
    if (config) {
      this.config = config
    } else {
      this.config = {
        login: (to, _, next) => {
          if (to.path === '/login') {
            next()
          } else {
            next(`/login?redirect=${to.path}`)
          }
        }
      }
    }
  }

  public intercept(context: RouteInterceptContext) {
    context.router.beforeEach(async (to, from, next) => {
      nprogress.start()
      if (context.store.state.user.token) {
        if (to.path === '/login') {
          next({ path: '/' })
        } else {
          if (context.store.state.user.roles.length === 0) {
            try {
              await context.store.dispatch('user/GetUserInfo')
              const roles = context.store.state.user.roles
              await context.store.dispatch('permission/GenerateRoutes', roles)
              context.router.addRoutes(context.store.state.permission.dynamic)
              next({ ...to, replace: true } as any)
            } catch (err) {
              await context.store.dispatch('user/ResetToken')
              // tslint:disable-next-line: no-floating-promises
              Message.error(err || 'Has Error')
              this.config.login(to, from, next)
            }
          } else {
            next()
          }
        }
      } else {
        if (to.meta && to.meta.white) {
          if (to.path === '/login') {
            this.config.login(to, from, next)
          } else {
            next()
          }
        } else {
          this.config.login(to, from, next)
        }
      }
    })

    context.router.afterEach((to: Route) => {
      nprogress.done()
    })
  }
}
