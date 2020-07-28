import { Component, Prop, Vue } from 'vue-property-decorator'
import { Pagination } from '../../components'
import { Pagination as PaginationCriteria } from '../../models'
import { DefaultResponseAdapter, DefaultSearchResultAdapter, ResponseAdapter, SearchResultAdapter } from '../../utils'

@Component({ name: 'List', components: { Pagination } })
export default class List<TEntity, TCriteria extends PaginationCriteria> extends Vue {
  @Prop({ required: true })
  public criteria!: TCriteria
  @Prop({ type: Function, required: true })
  public searchApi!: (criteria: TCriteria) => Promise<any>
  @Prop({ type: Function, default: (item: TEntity) => item })
  public decorate!: (item: TEntity) => any
  @Prop({ type: Boolean, default: false })
  public showToolbarOnSelect?: boolean
  @Prop({ type: Object, default: new DefaultResponseAdapter() })
  public responseAdapter?: ResponseAdapter
  @Prop({ type: Object, default: new DefaultSearchResultAdapter() })
  public searchResultAdapter?: SearchResultAdapter

  public list: TEntity[] = []
  public count: number = 0
  public loading: boolean = false
  public toolbar: boolean = false
  public async search(): Promise<void> {
    this.loading = true
    try {
      let response = await this.searchApi(this.criteria)
      if (this.responseAdapter) {
        let payload = this.responseAdapter.getPayload(response)
        if (payload) {
          if (this.searchResultAdapter) {
            this.list = this.searchResultAdapter.getList(payload)
            this.count = this.searchResultAdapter.getCount(payload)
          } else {
            this.list = payload.List || []
            this.count = payload.Count || 0
          }
        }
      } else {
        this.list = response.Entity.List || []
        this.count = response.Entity.Count || 0
      }
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
    await this.search()
  }

  private __selectionChange(selection: TEntity[]) {
    this.$emit('table-selection-change', selection)
    if (this.showToolbarOnSelect) {
      if (selection && selection.length) {
        this.toolbar = true
        return
      }
    }
    this.toolbar = false
  }
}
