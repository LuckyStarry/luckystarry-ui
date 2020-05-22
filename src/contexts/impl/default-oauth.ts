import { Context } from '../context'
import { OAuth } from '../oauth'
import { OAuthGenerator } from '../oauth-generator'
import { OAuthPayload } from '../oauth-payload'

export class DefaultOAuth implements OAuth {
  private mappings: Map<string, (payload: OAuthPayload) => Promise<string>> = new Map()
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public simple(authorize: string): void {
    this.install(
      'simple',
      (payload: OAuthPayload): Promise<string> => {
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
        let uri = `${authorize}?${parameters.join('&')}`
        return Promise.resolve(uri)
      }
    )
  }

  public install(type: string, generator: OAuthGenerator | ((payload: OAuthPayload) => Promise<string>)): void {
    if (isOAuthGenerator(generator)) {
      this.mappings.set(type, generator.generate)
    } else {
      this.mappings.set(type, generator)
    }
  }

  public authorize(type: string, payload: OAuthPayload): Promise<string> {
    let generator = this.mappings.get(type)
    if (generator) {
      return generator(payload)
    }
    throw new Error('未实现的授权方案')
  }
}

function isOAuthGenerator(generator: OAuthGenerator | ((payload: OAuthPayload) => Promise<string>)): generator is OAuthGenerator {
  // tslint:disable-next-line: strict-type-predicates
  return (generator as OAuthGenerator).generate !== undefined
}
