import Vue, { VueConstructor } from 'vue'
import VueRouter from 'vue-router'
import { RouterBuilder } from './router-builder'
import { StoreBuilder } from './store-builder'

export interface VueBuilder {
  router(config: (bd: RouterBuilder) => VueRouter): VueBuilder
  store(config: (bd: StoreBuilder) => void): VueBuilder
  extra(config: (payload: any) => void): VueBuilder
  app(app: VueConstructor): VueBuilder
  title(title: string): VueBuilder
  build(): Vue
}
