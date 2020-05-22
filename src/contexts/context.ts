import { Apis } from './apis'
import { Cookie } from './cookie'
import { OAuth } from './oauth'
import { Routes } from './routes'
import { System } from './system'
import { Token } from './token'

export interface Context {
  apis: Apis
  oauth: OAuth
  routes: Routes
  cookie: Cookie
  token: Token
  system: System
}
