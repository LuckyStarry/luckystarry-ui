import { compile } from 'path-to-regexp'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route, RouteRecord } from 'vue-router'

@Component
export default class Breadcrumb extends Vue {
  private breadcrumbs: RouteRecord[] = []

  @Watch('$route')
  private onRouteChange(route: Route) {
    // if you go to the redirect page, do not update the breadcrumbs
    if (route.path.startsWith('/redirect/')) {
      return
    }
    this.getBreadcrumb()
  }

  public created() {
    this.getBreadcrumb()
  }

  private getBreadcrumb() {
    let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
    const first = matched[0]
    if (!this.isDashboard(first)) {
      matched = [{ path: '/dashboard', meta: { title: 'dashboard' } } as RouteRecord].concat(matched)
    }
    this.breadcrumbs = matched.filter(item => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
  }

  private isDashboard(route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
  }

  private pathCompile(path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route
    const toPath = compile(path)
    return toPath(params)
  }

  private async handleLink(item: any) {
    const { redirect, path } = item
    if (redirect) {
      await this.$router.push(redirect)
      return
    }
    await this.$router.push(this.pathCompile(path))
  }

  private getTitle(title: string): string {
    let name = 'route.' + title
    let trans = `${this.$t(name)}`
    if (trans && trans !== name) {
      return trans
    } else {
      return title
    }
  }
}
