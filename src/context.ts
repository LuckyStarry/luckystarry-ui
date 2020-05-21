import Cookie, { CookieAttributes } from 'js-cookie'
import VueRouter, { RouteConfig } from 'vue-router'
import { Profile } from './models'

export class Context {
  public constructor() {
    this.apis = new DefaultApis(this)
    this.routes = new DefaultRoutes(this)
    this.cookie = new DefaultCookie(this)
    this.token = new DefaultToken(this)
    this.system = new DefaultSystem(this)
  }
  public apis: Apis
  public routes: Routes
  public cookie: Cookie
  public token: Token
  public system: System

  public static create(): Context {
    return new Context()
  }
}

export interface Apis {
  getProfile(): Promise<Profile>
  logout(): Promise<void>
}

export interface Routes {
  constants: RouteConfig[]
  dynamic: RouteConfig[]
  reset(): void
  add(...route: RouteConfig[]): void
  create(): VueRouter
}

export interface Cookie {
  set(key: string, value: String, payload?: { expiry?: Date; domain?: string }): void
  get(key: string): string
  delete(key: string): void
}

export interface Token {
  set(token: string): void
  get(): string
  delete(): void
}

export interface System {
  setSize(value: string): void
  getSize(): string
  setLanguage(value: string): void
  getLanguage(): string
  setSidebarStatus(value: string): void
  getSidebarStatus(): string
}

class DefaultApis implements Apis {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public getProfile(): Promise<Profile> {
    throw new Error('Method not implemented.')
  }
  public logout(): Promise<void> {
    return Promise.resolve()
  }
}

class DefaultRoutes implements Routes {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  private router!: VueRouter
  public constants: RouteConfig[] = []
  public dynamic: RouteConfig[] = []
  public reset(): void {
    let router = this.create() as any
    let original = this.router as any
    original.matcher = router.matcher
  }
  public add(...route: RouteConfig[]): void {}
  public create(): VueRouter {
    let router = new VueRouter({
      mode: 'history',
      scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 0 }
        }
      },
      base: process.env.BASE_URL,
      routes: this.constants
    })
    if (!this.router) {
      this.router = router
    }
    return router
  }
}

class DefaultCookie implements Cookie {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public set(key: string, value: String, payload?: { expiry?: Date; domain?: string }): void {
    if (payload) {
      let options: CookieAttributes = {}
      if (payload.expiry) {
        options.expires = payload.expiry
      }
      if (payload.domain) {
        options.domain = payload.domain
      }
      Cookie.set('LUCKYSTARRY_' + key, value, options)
    } else {
      Cookie.set('LUCKYSTARRY_' + key, value)
    }
  }

  public get(key: string): string {
    return Cookie.get('LUCKYSTARRY_' + key) || ''
  }

  public delete(key: string): void {
    Cookie.remove('LUCKYSTARRY_' + key)
  }
}

class DefaultToken implements Token {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public set(token: string): void {
    this.context.cookie.set('TOKEN', token)
  }

  public get(): string {
    return this.context.cookie.get('TOKEN')
  }

  public delete(): void {
    this.context.cookie.delete('TOKEN')
  }
}

class DefaultSystem implements System {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public setLanguage(value: string): void {
    this.context.cookie.set('LANGUAGE', value)
  }
  public getLanguage(): string {
    return this.context.cookie.get('LANGUAGE')
  }

  public setSize(value: string): void {
    this.context.cookie.set('SIZE', value)
  }

  public getSize(): string {
    return this.context.cookie.get('SIZE')
  }

  public setSidebarStatus(value: string): void {
    this.context.cookie.set('SIDEBAR', value)
  }

  public getSidebarStatus(): string {
    return this.context.cookie.get('SIDEBAR')
  }
}
