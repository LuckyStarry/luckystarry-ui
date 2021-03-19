import { Store } from 'vuex'
import { IRootState } from '../store'
import { AxiosHeaderBuilder } from './axios-header-builder'

export class DefaultAxiosHeaderBuilder implements AxiosHeaderBuilder {
  protected store: Store<IRootState>
  public constructor(store: Store<IRootState>) {
    this.store = store
  }

  public build(headers: { [key: string]: string }): void {
    if (this.store.state.user.token) {
      headers['X-Access-Token'] = this.store.state.user.token
    }
  }
}
