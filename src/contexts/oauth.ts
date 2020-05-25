import { OAuthClient } from './oauth-client'
import { OAuthPayload } from './oauth-payload'

export interface OAuth {
  install(type: string, client: OAuthClient): void
  authorize(type: string, payload: OAuthPayload): Promise<string>
  callback(type: string, payload: OAuthPayload): Promise<string>
}
