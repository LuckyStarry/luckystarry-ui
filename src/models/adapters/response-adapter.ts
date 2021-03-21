import { Response } from '../response'
export class ResponseAdapter<T = any> implements Response {
  protected response?: any
  public constructor(response: any) {
    this.response = response
  }

  public get Success(): boolean {
    let success = this.response?.success
    if (typeof success === 'undefined') {
      success = this.response?.Success
    }
    return typeof success === 'boolean' ? success : !!success
  }

  public get Message(): string {
    let message = this.response?.message
    if (typeof message === 'undefined') {
      message = this.response?.Message
    }
    return typeof message === 'string' ? message : ''
  }

  public get Payload(): T {
    let payload = this.response?.payload
    if (typeof payload === 'undefined') {
      payload = this.response?.Payload
    }
    if (typeof payload === 'undefined') {
      // 旧版实体契约(1.0.5及以前版本)
      payload = this.response?.Entity
    }
    return payload
  }
}
