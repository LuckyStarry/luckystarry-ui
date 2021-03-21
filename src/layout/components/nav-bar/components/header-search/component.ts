import Fuse from 'fuse.js'
import path from 'path'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { Getter } from 'vuex-class'

@Component
export default class HeaderSearch extends Vue {
  private search = ''
  private show = false
  private options: RouteConfig[] = []
  private searchPool: RouteConfig[] = []
  private fuse?: Fuse<RouteConfig>

  @Getter('permission/Routes')
  public routes!: RouteConfig[]

  @Watch('routes')
  private onRoutesChange() {
    this.searchPool = this.generateRoutes(this.routes)
  }

  @Watch('searchPool')
  private onSearchPoolChange(value: RouteConfig[]) {
    this.initFuse(value)
  }

  @Watch('show')
  private onShowChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.close)
    } else {
      document.body.removeEventListener('click', this.close)
    }
  }

  public mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  }

  private click() {
    this.show = !this.show
    if (this.show) {
      this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as HTMLElement).focus()
    }
  }

  private close() {
    this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as HTMLElement).blur()
    this.options = []
    this.show = false
  }

  private async change(route: RouteConfig) {
    await this.$router.push(route.path)
    this.search = ''
    this.options = []
    this.$nextTick(() => {
      this.show = false
    })
  }

  private initFuse(list: RouteConfig[]) {
    this.fuse = new Fuse(list, {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      keys: [
        {
          name: 'title',
          weight: 0.7
        },
        {
          name: 'path',
          weight: 0.3
        }
      ]
    })
  }

  // Filter out the routes that can be displayed in the sidebar
  // And generate the internationalized title
  private generateRoutes(routes: RouteConfig[], basePath = '/', prefixTitle: string[] = []) {
    let res: RouteConfig[] = []

    for (const router of routes) {
      // skip hidden router
      if (router.meta && router.meta.hidden) {
        continue
      }

      const data: RouteConfig = {
        path: path.resolve(basePath, router.path),
        meta: {
          title: [...prefixTitle]
        }
      }

      if (router.meta && router.meta.title) {
        // generate internationalized title
        // const i18ntitle = i18n.t(`route.${router.meta.title}`).toString()
        // data.meta.title = [...data.meta.title, i18ntitle]
        if (router.redirect !== 'noRedirect') {
          // only push the routes with title
          // special case: need to exclude parent router without redirect
          res.push(data)
        }
      }

      // recursive child routes
      if (router.children) {
        const tempRoutes = this.generateRoutes(router.children, data.path, data.meta.title)
        if (tempRoutes.length >= 1) {
          res = [...res, ...tempRoutes]
        }
      }
    }
    return res
  }

  private querySearch(query: string) {
    if (query !== '') {
      if (this.fuse) {
        this.options = this.fuse.search(query) as any
      }
    } else {
      this.options = []
    }
  }
}
