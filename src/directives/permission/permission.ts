import { DirectiveOptions } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import { Store } from 'vuex'
import { IRootState } from '../../store'

export class Premission implements DirectiveOptions {
  private store: Store<IRootState>
  public constructor(store: Store<IRootState>) {
    this.store = store
  }

  public inserted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    let roles: string[] = []
    let def: Premission = (binding as any).def
    if (def) {
      roles = def.store.state.user.roles || []
    }
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
