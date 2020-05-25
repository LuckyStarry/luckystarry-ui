import { OAuthPayload } from './oauth-payload'

export interface OAuthClient {
  authorize: (payload: OAuthPayload) => Promise<string>
  callback: (payload: OAuthPayload) => Promise<string>
}
