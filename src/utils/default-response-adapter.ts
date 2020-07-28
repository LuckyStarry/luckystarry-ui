import { ResponseAdapter } from './response-adapter'

export class DefaultResponseAdapter<T = any> implements ResponseAdapter<T> {
  public isSuccessful(obj: T): boolean {
    if (obj) {
      return (obj as any).Success
    }
    return false
  }

  public getMessage(obj: T): string {
    if (obj) {
      return (obj as any).Message
    }
    return ''
  }

  public getPayload<U = any>(obj: T): U {
    if (obj) {
      return (obj as any).Entity
    }
    return null as any
  }
}
