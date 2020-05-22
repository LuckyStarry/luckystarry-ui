import VueRouter, { RouteConfig } from 'vue-router'

export interface Routes {
  constants: RouteConfig[]
  dynamic: RouteConfig[]
  reset(): void
  add(...route: RouteConfig[]): void
  create(): VueRouter
}
