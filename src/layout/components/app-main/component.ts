import { store } from 'luckystarry-ui-utils'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class AppMain extends Vue {
  @Getter('tagsView/CachedViews')
  public cachedViews!: store.ITagView[]

  public get key() {
    return this.$route.path
  }
}
