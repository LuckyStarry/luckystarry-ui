import { Component, Prop, Vue } from 'vue-property-decorator'
import { Pagination } from '../../components'
import { adapters, Pagination as PaginationCriteria } from '../../models'

@Component({ name: 'List', components: { Pagination } })
export default class List<TEntity, TCriteria extends PaginationCriteria> extends Vue {
  @Prop({ default: () => [10, 20, 30, 50] })
  public pageSizes!: number[]
  @Prop({ required: true })
  public criteria!: TCriteria
  @Prop({ type: Function, required: true })
  public searchApi!: (criteria: TCriteria) => Promise<any>
  @Prop({ type: Function, default: (item: TEntity) => item })
  public decorate!: (item: TEntity) => any
  @Prop({ type: Boolean, default: false })
  public showToolbarOnSelect?: boolean
  @Prop({ type: Boolean, default: false })
  public showToolbar?: boolean
  @Prop({ type: Object, default: () => new adapters.ResponseAdapterFactory() })
  public responseAdapter?: adapters.ResponseAdapterFactory
  @Prop({ type: Object, default: () => new adapters.SearchResultAdapterFactory() })
  public searchResultAdapter?: adapters.SearchResultAdapterFactory

  public list: TEntity[] = []
  public count: number = 0
  public loading: boolean = false
  public toolbar: boolean = false
  public async search(): Promise<void> {
    this.loading = true
    try {
      let response = await this.searchApi(this.criteria)
      if (this.responseAdapter) {
        const data = this.responseAdapter.create(response)
        if (data.Success) {
          if (this.searchResultAdapter) {
            const payload = this.searchResultAdapter.create<TEntity>(data.Payload)
            this.list = payload.List || []
            this.count = payload.Count || 0
            return
          }
        } else {
          this.$message.warning(`查询列表失败：${data.Message}`)
          return
        }
      }
      this.$message.error(`适配器不可为空`)
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

  public get decorated(): any[] {
    if (this.list && this.list.length) {
      return this.list.map(this.decorate)
    }
    return this.list
  }

  public async mounted() {
    if (this.showToolbar) {
      this.toolbar = true
    }
    await this.search()
  }

  private __selectionChange(selection: TEntity[]) {
    this.$emit('table-selection-change', selection)
    if (this.showToolbar) {
      this.toolbar = true
      return
    }
    if (this.showToolbarOnSelect) {
      if (selection && selection.length) {
        this.toolbar = true
        return
      }
    }
    this.toolbar = false
  }
}
