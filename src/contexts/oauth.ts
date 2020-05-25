import { OAuthGenerator } from './oauth-generator'
import { OAuthPayload } from './oauth-payload'

export interface OAuth {
  simple(authorize: string): void
  install(type: string, generator: OAuthGenerator | ((payload: OAuthPayload) => Promise<string>)): void
  authorize(type: string, payload: OAuthPayload): Promise<string>
}
