import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: AsyncDialog.name })
export default class AsyncDialog<T = any> extends Vue {
  @Prop({ type: String, default: '' })
  public title!: string
  @Prop({ type: String, default: '800px' })
  public width!: string

  public visible: boolean = false

  private resolve: ((value?: T | Promise<T> | undefined) => void) | null = null
  private reject: ((reason?: any) => void) | null = null

  public async open(payload?: any): Promise<T> {
    return new Promise(async (resolve, reject) => {
      this.resolve = resolve
      this.reject = reject

      this.visible = true
      this.$emit('on-open', { payload, actions: { ok: () => this.ok(), close: () => this.close() } })
    })
  }

  public async ok(payload?: T) {
    let resolve = this.resolve
    if (resolve) {
      resolve(payload)
    }
    await this.close()
  }

  public async close() {
    let reject = this.reject

    if (this.visible) {
      this.visible = false
    }

    this.resolve = null
    this.reject = null

    if (reject) {
      reject()
    }
  }
}
