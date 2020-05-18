import ElementUI, { Message, MessageBox } from 'element-ui'
import luckystarry, { Context } from 'luckystarry-ui-utils'
import 'normalize.css'
import nprogress from 'nprogress'
import Vue from 'vue'
import { App } from './app'

export class Builder extends luckystarry.Builder {
  public constructor(context?: Context) {
    super(context)
    this.app(App)
    this.message({
      info: message => (message ? Message.info(message) : null),
      warning: message => (message ? Message.warning(message) : null),
      error: message => (message ? Message.error(message) : null),
      success: message => (message ? Message.success(message) : null)
    })
    this.messagebox({
      alert: (message, title, options) =>
        MessageBox.alert(message, title || '', options || ({} as any)),
      confirm: (message, title, options) =>
        MessageBox.confirm(message, title || '', options || ({} as any))
    })
    this.process({
      start: nprogress.start,
      done: nprogress.done
    })
  }

  public static create(context?: Context): Builder {
    return new Builder(context)
  }

  public build(): Vue {
    Vue.use(ElementUI, {
      size: 'mini'
    })
    return super.build()
  }
}
