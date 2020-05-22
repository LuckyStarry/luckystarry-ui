import { impl } from './contexts'

export class Context extends impl.DefaultContext {
  public static create(): Context {
    return new Context()
  }
}
