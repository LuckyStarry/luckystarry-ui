import { Dictionary } from 'vue-router/types/router'

export interface OAuthPayload {
  path: string
  query: Dictionary<string | (string | null)[]>
  params: Dictionary<string>
  hash: string
  host: string
}
