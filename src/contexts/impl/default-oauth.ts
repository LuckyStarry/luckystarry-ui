import { Context } from '../context'
import { OAuth } from '../oauth'
import { OAuthClient } from '../oauth-client'
import { OAuthPayload } from '../oauth-payload'

export class DefaultOAuth implements OAuth {
  private clients: Map<string, OAuthClient> = new Map()
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public install(type: string, client: OAuthClient): void {
    this.clients.set(type, client)
  }

  public authorize(type: string, payload: OAuthPayload): Promise<string> {
    let client = this.clients.get(type)
    if (client) {
      return client.authorize(payload)
    }
    throw new Error('未实现的授权方案')
  }

  public callback(type: string, payload: OAuthPayload): Promise<string> {
    let client = this.clients.get(type)
    if (client) {
      return client.callback(payload)
    }
    throw new Error('未实现的授权方案')
  }
}
