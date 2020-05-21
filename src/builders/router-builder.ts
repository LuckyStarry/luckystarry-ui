import VueRouter, { RouteConfig } from 'vue-router'
import { Component } from 'vue-router/types/router'
import { Context } from '../context'
import { Layout } from '../layout'
import * as ui from '../ui'

export class RouterBuilder {
  private mappings: Map<string, RouteConfig> = new Map()
  private context: Context
  public constructor(context: Context) {
    this.context = context
    this.mappings.set('401', { path: '/401', component: ui.Page401, meta: { hidden: true, white: true } })
    this.mappings.set('404', { path: '/404', component: ui.Page404, meta: { hidden: true, white: true } })
    this.mappings.set('redirect', {
      path: '/redirect',
      component: Layout,
      meta: { hidden: true },
      children: [{ path: '/redirect/:path(.*)', component: ui.Redirect }]
    })
  }

  public home(component: Component, option?: { redirect?: string; meta?: any }): RouterBuilder {
    let meta = Object.assign({ title: 'dashboard', icon: 'dashboard', affix: true }, option && option.meta)
    let route: RouteConfig = Object.assign({ path: 'dashboard', component, meta, name: 'Dashboard' })
    this.mappings.set('home', {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [route]
    })
    return this
  }

  public login(component: Component, path: string = '/login') {
    this.mappings.set('login', {
      path,
      component,
      meta: { hidden: true, white: true }
    })
    return this
  }

  public callback(component: Component, path: string = '/oauth/callback') {
    this.mappings.set('callback', {
      path,
      component,
      meta: { hidden: true, white: true }
    })
    return this
  }

  public 401(component: Component) {
    this.mappings.set('401', {
      path: '/401',
      component,
      meta: { hidden: true, white: true }
    })
    return this
  }

  public 404(component: Component) {
    this.mappings.set('404', {
      path: '/404',
      component,
      meta: { hidden: true, white: true }
    })
    return this
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
    this.mappings.forEach((v, k) => {
      this.addConstantRoutes(v)
    })
    return this.context.routes.create()
  }
}
