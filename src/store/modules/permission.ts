import { RouteConfig } from 'vue-router'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { IRootState } from '..'

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
  dynamic: RouteConfig[]
}

@Module({ namespaced: true })
export class Permission extends VuexModule<IPermissionState, IRootState> implements IPermissionState {
  public routes: RouteConfig[] = []
  public dynamic: RouteConfig[] = []

  public get Routes(): RouteConfig[] {
    return this.routes || []
  }

  public get Dynamic(): RouteConfig[] {
    return this.dynamic || []
  }

  @Mutation
  private SET_ROUTES(payload: { routes: RouteConfig[]; constants: RouteConfig[] }) {
    this.routes = payload.constants.concat(payload.routes)
    this.dynamic = payload.routes
  }

  @Action
  public GenerateRoutes(roles: string[]) {
    let accessedRoutes: RouteConfig[]
    if (roles.includes('admin')) {
      accessedRoutes = this.context.rootState.context.routes.dynamic
    } else {
      accessedRoutes = filterAsyncRoutes(this.context.rootState.context.routes.dynamic, roles)
    }
    this.context.commit('SET_ROUTES', {
      routes: accessedRoutes,
      constants: this.context.rootState.context.routes.constants
    })
  }
}
