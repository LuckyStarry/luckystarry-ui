import { Component, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'

@Component
export class Closeable extends Vue {
  public async closeTagView() {
    let views: RouteConfig[] = this.$store.state['tagsView/visitedViews'] || []
    let view = views.find(v => v.path === this.$route.path)
    if (view) {
      await this.$store.dispatch('tagsView/delView', view)
    }
  }
}
