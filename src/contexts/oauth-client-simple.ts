import { Store } from 'vuex'
import { IRootState } from '../store'
import { OAuthClient } from './oauth-client'
import { OAuthPayload } from './oauth-payload'

export class OAuthClientSimple implements OAuthClient {
  // tslint:disable-next-line: variable-name
  private authorize_host: string
  private store: Store<IRootState>
  public constructor(authorize: string, store: Store<IRootState>) {
    this.authorize_host = authorize
    this.store = store
  }

  public authorize(payload: OAuthPayload): Promise<string> {
    let redirect = `${payload.query.redirect}`
    if (!redirect) {
      redirect = payload.host
    }
    let context: any = {
      redirect_uri: `${payload.host}/oauth/callback?redirect=${encodeURIComponent(redirect)}`
    }
    let parameters = []
    for (let key in context) {
      let value = context[key]
      parameters.push(`${key}=${encodeURIComponent(value)}`)
    }
    let uri = `${this.authorize_host}?${parameters.join('&')}`
    return Promise.resolve(uri)
  }

  public async callback(payload: OAuthPayload): Promise<string> {
    let match = window.location.hash.match(/access_token=([^&]*)/i)
    let token = (match && match[1]) || ''
    if (token) {
      await this.store.dispatch('user/Callback', () => Promise.resolve({ token }))
      let index = window.location.href.indexOf('#')
      return Promise.resolve(window.location.href.substr(0, index))
    } else {
      let redirect = payload.query.redirect
      return Promise.resolve(`${redirect}`)
    }
  }
}
