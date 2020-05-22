import Cookie, { CookieAttributes } from 'js-cookie'
import { Context } from '../context'
import { Cookie as CookieService } from '../cookie'

export class DefaultCookie implements CookieService {
  private _prefix = 'LUCKYSTARRY_'
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public set prefix(value: string) {
    this._prefix = value
  }
  public get prefix(): string {
    return this._prefix
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
      Cookie.set(this._prefix + key, value, options)
    } else {
      Cookie.set(this._prefix + key, value)
    }
  }

  public get(key: string): string {
    return Cookie.get(this._prefix + key) || ''
  }

  public delete(key: string): void {
    Cookie.remove(this._prefix + key)
  }
}
