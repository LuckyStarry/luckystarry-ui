import VueRouter, { RouteConfig } from 'vue-router'

export interface Routes {
  constants: RouteConfig[]
  dynamic: RouteConfig[]
  baseURL: string
  reset(): void
  add(...route: RouteConfig[]): void
  create(): VueRouter
}
