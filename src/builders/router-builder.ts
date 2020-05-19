import VueRouter, { RouteConfig } from 'vue-router'
import { Context } from '../context'

export class RouterBuilder {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public addConstantRoutes(routes: RouteConfig[]): RouterBuilder {
    this.context.routes.constants.push(...routes)
    return this
  }

  public addDynamicRoutes(routes: RouteConfig[]): RouterBuilder {
    this.context.routes.dynamic.push(...routes)
    return this
  }

  public build(): VueRouter {
    return this.context.routes.create()
  }
}
