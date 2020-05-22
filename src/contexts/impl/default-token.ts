import { Context } from '../context'
import { Token } from '../token'

export class DefaultToken implements Token {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public set(token: string): void {
    this.context.cookie.set('TOKEN', token)
  }

  public get(): string {
    return this.context.cookie.get('TOKEN')
  }

  public delete(): void {
    this.context.cookie.delete('TOKEN')
  }
}
