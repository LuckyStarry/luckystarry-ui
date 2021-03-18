import { Component, Prop, Vue } from 'vue-property-decorator'
import { adapters } from '../../models'

@Component({ name: 'Form' })
export default class Form<TEntity> extends Vue {
  public subject: TEntity | null = null
  @Prop({ type: Function, required: true })
  public loadApi!: () => Promise<any>
  @Prop({ type: Object, default: () => new adapters.ResponseAdapterFactory() })
  public responseAdapter?: adapters.ResponseAdapterFactory
  @Prop({ type: Object, default: () => {} })
  public rules?: any
  @Prop({ type: String, default: '' })
  public stickyTips?: string

  public loading: boolean = false
  public async load(): Promise<void> {
    await this.proxy(async () => {
      const response = await this.loadApi()
      if (this.responseAdapter) {
        const data = this.responseAdapter.create<TEntity>(response)
        if (data.Success) {
          if (data.Payload) {
            this.subject = data.Payload
          } else {
            this.$message.error(`获取到的实体为空`)
            this.subject = null as any
            return
          }
        }
      } else {
        this.$message.error(`适配器不可为空`)
        this.subject = null as any
        return
      }
    })
  }

  public async proxy(process: () => Promise<void>) {
    this.loading = true
    try {
      await process()
    } catch (e) {
      if (e) {
        if (e.message) {
          this.$message.error(`系统发生异常：${e.message}`)
        } else if (e.Message) {
          this.$message.error(`服务端发生异常：${e.Message}`)
        } else {
          this.$message.error('发生了一个未知错误，请联系管理员')
        }
      }
    } finally {
      this.loading = false
    }
  }

  public async mounted() {
    await this.load()
  }
}
