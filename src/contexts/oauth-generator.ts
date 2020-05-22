import { OAuthPayload } from './oauth-payload'

export interface OAuthGenerator {
  generate: (payload: OAuthPayload) => Promise<string>
}
