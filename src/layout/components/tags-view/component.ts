import path from 'path'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { Getter } from 'vuex-class'
import { ITagView } from '../../../store'
import { ScrollPane } from './components'

@Component({ components: { ScrollPane } })
export default class TagsView extends Vue {
  private visible: boolean = false
  private top: number = 0
  private left: number = 0
  private selectedTag: ITagView = {}
  private affixTags: ITagView[] = []

  @Getter('tagsView/VisitedViews')
  public visitedViews!: ITagView[]

  @Getter('permission/Routes')
  public routes!: RouteConfig[]

  @Watch('$route')
  private async onRouteChange() {
    await this.addTags()
    this.moveToCurrentTag()
  }

  @Watch('visible')
  private onVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu)
    } else {
      document.body.removeEventListener('click', this.closeMenu)
    }
  }

  public async mounted() {
    await this.initTags()
    await this.addTags()
  }

  private isActive(route: ITagView) {
    return route.path === this.$route.path
  }

  private isAffix(tag: ITagView) {
    return tag.meta && tag.meta.affix
  }

  private filterAffixTags(routes: RouteConfig[], basePath = '/') {
    let tags: ITagView[] = []
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        })
      }
      if (route.children) {
        const childTags = this.filterAffixTags(route.children, route.path)
        if (childTags.length >= 1) {
          tags = [...tags, ...childTags]
        }
      }
    })
    return tags
  }

  private async initTags() {
    this.affixTags = this.filterAffixTags(this.routes)
    for (const tag of this.affixTags) {
      // Must have tag name
      if (tag.name) {
        await this.$store.dispatch('tagsView/addVisitedView', tag)
      }
    }
  }

  private async addTags() {
    const { name } = this.$route
    if (name) {
      await this.$store.dispatch('tagsView/addView', this.$route)
    }
    return false
  }

  private moveToCurrentTag() {
    const tags = this.$refs.tag as any[] // TODO: better typescript support for router-link
    this.$nextTick(async () => {
      for (const tag of tags) {
        if ((tag.to as ITagView).path === this.$route.path) {
          let panel = this.$refs.scrollPane as any
          panel.moveToTarget(tag)
          // When query is different then update
          if ((tag.to as ITagView).fullPath !== this.$route.fullPath) {
            await this.$store.dispatch(
              'tagsView/updateVisitedView',
              this.$route
            )
          }
          break
        }
      }
    })
  }

  private async refreshSelectedTag(view: ITagView) {
    await this.$store.dispatch('tagsView/delCachedView', view)
    const { fullPath } = view
    this.$nextTick(async () => {
      await this.$router.replace({
        path: '/redirect' + fullPath
      })
    })
  }

  private async closeSelectedTag(view: ITagView) {
    await this.$store.dispatch('tagsView/delView', view)
    if (this.isActive(view)) {
      await this.toLastView(this.visitedViews, view)
    }
  }

  private async closeOthersTags() {
    await this.$router.push({ path: this.selectedTag.fullPath })
    await this.$store.dispatch('tagsView/delOthersViews', this.selectedTag)
    this.moveToCurrentTag()
  }

  private async closeAllTags(view: ITagView) {
    await this.$store.dispatch('tagsView/delAllViews', view)
    if (this.affixTags.some(tag => tag.path === this.$route.path)) {
      return
    }
    await this.toLastView(this.visitedViews, view)
  }

  private async toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView) {
      await this.$router.push({ path: latestView.fullPath })
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === 'Dashboard') {
        // to reload home page
        await this.$router.replace({ path: '/redirect' + view.fullPath })
      } else {
        await this.$router.push('/')
      }
    }
  }

  private openMenu(tag: ITagView, e: MouseEvent) {
    const menuMinWidth = 105
    const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = (this.$el as HTMLElement).offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft + 15 // 15: margin right
    if (left > maxLeft) {
      this.left = maxLeft
    } else {
      this.left = left
    }
    this.top = e.clientY
    this.visible = true
    this.selectedTag = tag
  }

  private closeMenu() {
    this.visible = false
  }
}
