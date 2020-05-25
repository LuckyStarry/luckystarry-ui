import { Component, Prop, Vue } from 'vue-property-decorator'
import { Pagination } from '../../components'
import { Pagination as PaginationCriteria, Response, SearchResult } from '../../models'

@Component({ name: 'List', components: { Pagination } })
export default class List<TEntity, TCriteria extends PaginationCriteria> extends Vue {
  @Prop({ required: true })
  public criteria!: TCriteria
  @Prop({ type: Function, required: true })
  public searchApi!: (criteria: TCriteria) => Promise<Response<SearchResult<TEntity>>>

  public list: TEntity[] = []
  public count: number = 0
  public loading: boolean = false
  public async search(): Promise<void> {
    this.loading = true
    try {
      let response = await this.searchApi(this.criteria)
      this.list = response.Entity.List || []
      this.count = response.Entity.Count || 0
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
    await this.search()
  }
}
