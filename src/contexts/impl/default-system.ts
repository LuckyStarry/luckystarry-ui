import { Context } from '../context'
import { System } from '../system'

export class DefaultSystem implements System {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public setLanguage(value: string): void {
    this.context.cookie.set('LANGUAGE', value)
  }
  public getLanguage(): string {
    return this.context.cookie.get('LANGUAGE')
  }

  public setSize(value: string): void {
    this.context.cookie.set('SIZE', value)
  }

  public getSize(): string {
    return this.context.cookie.get('SIZE')
  }

  public setSidebarStatus(value: string): void {
    this.context.cookie.set('SIDEBAR', value)
  }

  public getSidebarStatus(): string {
    return this.context.cookie.get('SIDEBAR')
  }
}
