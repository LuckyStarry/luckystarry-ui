import VueRouter, { RouteConfig } from 'vue-router'
import { Component } from 'vue-router/types/router'
import { Context } from '../context'
import { Layout } from '../layout'

export class RouterBuilder {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public home(component: Component, option?: { redirect?: string; meta?: any }): RouterBuilder {
    let meta = Object.assign({ title: 'dashboard', icon: 'dashboard', affix: true }, option && option.meta)
    let route: RouteConfig = Object.assign({ path: 'dashboard', component, meta, name: 'Dashboard' })
    return this.addConstantRoutes({
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [route]
    })
  }

  public login(component: Component, path: string = '/login') {
    this.addConstantRoutes({
      path,
      component,
      meta: { hidden: true, white: true }
    })
  }

  public callback(component: Component, path: string = '/oauth/callback') {
    return this.addConstantRoutes({
      path,
      component,
      meta: { hidden: true, white: true }
    })
  }

  public 401(component: Component, path: string = '/401') {
    return this.addConstantRoutes({
      path,
      component,
      meta: { hidden: true, white: true }
    })
  }

  public 404(component: Component, path: string = '/404') {
    return this.addConstantRoutes({
      path,
      component,
      meta: { hidden: true, white: true }
    })
  }

  public addConstantRoutes(...routes: RouteConfig[]): RouterBuilder {
    if (routes && routes.length) {
      this.context.routes.constants.push(...routes)
    }
    return this
  }

  public addDynamicRoutes(...routes: RouteConfig[]): RouterBuilder {
    if (routes && routes.length) {
      this.context.routes.dynamic.push(...routes)
    }
    return this
  }

  public build(): VueRouter {
    return this.context.routes.create()
  }
}
