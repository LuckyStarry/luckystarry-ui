import VueRouter, { RouteConfig } from 'vue-router'
import { Context } from '../context'
import { Routes } from '../routes'

export class DefaultRoutes implements Routes {
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
