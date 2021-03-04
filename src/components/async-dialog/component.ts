import { Component, Prop, Vue } from 'vue-property-decorator'

interface Context<T = any, U = T> {
  title?: string
  load?: () => Promise<T>
  process?: () => Promise<U>
}

@Component({ name: AsyncDialog.name })
export default class AsyncDialog<T = any, U = T> extends Vue {
  @Prop({ type: String, default: '' })
  public title!: string
  @Prop({ type: String, default: '800px' })
  public width!: string
  @Prop({ type: Boolean, default: false })
  public closeOnClickModal?: boolean
  @Prop({ type: Boolean, default: false })
  public closeOnPressEscape?: boolean

  private visible: boolean = false
  private loading: boolean = false
  private processing: boolean = false
  private context: Context<T, U> = {}
  private subject: T = null as any

  private get TITLE(): string {
    if (this.context.title) {
      return this.context.title
    }
    if (this.title) {
      return this.title
    }
    return ''
  }

  private resolve?: (value: U | Promise<U>) => void
  private reject?: (reason?: any) => void
  private payload?: T

  public async open(context: Context): Promise<U> {
    this.context = context || {}
    this.reject = undefined
    this.resolve = undefined
    return new Promise(async (resolve, reject) => {
      this.processing = false
      this.loading = true
      this.visible = true
      let legal = true
      if (this.context.load) {
        try {
          let subject = await this.context.load()
          if (subject) {
            this.subject = subject
          }
        } catch (error) {
          legal = false
          if (error) {
            console.error(error)
          }
        }
      }
      if (legal) {
        this.resolve = resolve
        this.reject = reject
        this.loading = false
      } else {
        this.visible = false
        reject()
      }
    })
  }

  public async ok() {
    let legal = false
    let subject: T | U = this.subject
    if (this.context.process) {
      try {
        this.loading = true
        this.processing = true
        subject = await this.context.process()
        legal = true
      } catch (error) {
        if (error) {
          console.error(error)
        }
      } finally {
        this.processing = false
        this.loading = false
      }
    } else {
      legal = true
    }

    if (legal) {
      let resolve = this.resolve
      this.resolve = undefined
      this.reject = undefined

      if (this.visible) {
        this.visible = false
      }

      if (resolve) {
        resolve(subject as U)
      }
    }
  }

  public async close() {
    let reject = this.reject
    this.resolve = undefined
    this.reject = undefined

    if (this.visible) {
      this.visible = false
    }

    if (reject) {
      reject()
    }
  }
}
