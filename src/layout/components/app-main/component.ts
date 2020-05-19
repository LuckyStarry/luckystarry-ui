import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { ITagView } from '../../../store'

@Component
export default class AppMain extends Vue {
  @Getter('tagsView/CachedViews')
  public cachedViews!: ITagView[]

  public get key() {
    return this.$route.path
  }
}
