import { Apis } from '../apis'
import { Context } from '../context'
import { Cookie } from '../cookie'
import { OAuth } from '../oauth'
import { Routes } from '../routes'
import { System } from '../system'
import { Token } from '../token'
import { DefaultCookie } from './default-cookie'
import { DefaultOAuth } from './default-oauth'
import { DefaultRoutes } from './default-routes'
import { DefaultSystem } from './default-system'
import { DefaultToken } from './default-token'
import { DefaultApis } from './detault-apis'

export class DefaultContext implements Context {
  public constructor() {
    this.apis = new DefaultApis(this)
    this.oauth = new DefaultOAuth(this)
    this.routes = new DefaultRoutes(this)
    this.cookie = new DefaultCookie(this)
    this.token = new DefaultToken(this)
    this.system = new DefaultSystem(this)
  }
  public apis: Apis
  public oauth: OAuth
  public routes: Routes
  public cookie: Cookie
  public token: Token
  public system: System

  public static create(): Context {
    return new DefaultContext()
  }
}
