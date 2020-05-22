import { OAuthGenerator } from './oauth-generator'
import { OAuthPayload } from './oauth-payload'

export interface OAuth {
  install(type: string, generator: OAuthGenerator | ((payload: OAuthPayload) => Promise<string>)): void
  authorize(type: string, payload: OAuthPayload): Promise<string>
}
