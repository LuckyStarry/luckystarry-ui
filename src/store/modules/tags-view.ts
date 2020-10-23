import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { ITagView } from '../tags-view'

export interface ITagsViewState {
  visitedViews: ITagView[]
  cachedViews: (string | undefined)[]
}

@Module({ namespaced: true })
export class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews: ITagView[] = []
  public cachedViews: (string | undefined)[] = []

  public get VisitedViews(): ITagView[] {
    return this.visitedViews || []
  }

  public get CachedViews(): (string | undefined)[] {
    return this.cachedViews || []
  }

  @Mutation
  private ADD_VISITED_VIEW(view: ITagView) {
    if (this.visitedViews.some(v => v.path === view.path)) return
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  }

  @Mutation
  private ADD_CACHED_VIEW(view: ITagView) {
    let name = view.name === null ? '' : view.name
    if (this.cachedViews.includes(name)) return
    if (!view.meta.noCache) {
      this.cachedViews.push(name)
    }
  }

  @Mutation
  private DEL_VISITED_VIEW(view: ITagView) {
    let i = 0
    for (const v of this.visitedViews) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1)
        break
      }
      i++
    }
  }

  @Mutation
  private DEL_CACHED_VIEW(view: ITagView) {
    let name = view.name === null ? '' : view.name
    const index = this.cachedViews.indexOf(name)
    index > -1 && this.cachedViews.splice(index, 1)
  }

  @Mutation
  private DEL_OTHERS_VISITED_VIEWS(view: ITagView) {
    this.visitedViews = this.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  }

  @Mutation
  private DEL_OTHERS_CACHED_VIEWS(view: ITagView) {
    let name = view.name === null ? '' : view.name
    const index = this.cachedViews.indexOf(name)
    if (index > -1) {
      this.cachedViews = this.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      this.cachedViews = []
    }
  }

  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    // keep affix tags
    const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
    this.visitedViews = affixTags
  }

  @Mutation
  private DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = []
  }

  @Mutation
  private UPDATE_VISITED_VIEW(view: ITagView) {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  @Action
  public addView(view: ITagView) {
    this.context.commit('ADD_VISITED_VIEW', view)
    this.context.commit('ADD_CACHED_VIEW', view)
  }

  @Action
  public addVisitedView(view: ITagView) {
    this.context.commit('ADD_VISITED_VIEW', view)
  }

  @Action
  public delView(view: ITagView) {
    this.context.commit('DEL_VISITED_VIEW', view)
    this.context.commit('DEL_CACHED_VIEW', view)
  }

  @Action
  public delCachedView(view: ITagView) {
    this.context.commit('DEL_CACHED_VIEW', view)
  }

  @Action
  public delOthersViews(view: ITagView) {
    this.context.commit('DEL_OTHERS_VISITED_VIEWS', view)
    this.context.commit('DEL_OTHERS_CACHED_VIEWS', view)
  }

  @Action
  public delAllViews() {
    this.context.commit('DEL_ALL_VISITED_VIEWS')
    this.context.commit('DEL_ALL_CACHED_VIEWS')
  }

  @Action
  public delAllCachedViews() {
    this.context.commit('DEL_ALL_CACHED_VIEWS')
  }

  @Action
  public updateVisitedView(view: ITagView) {
    this.context.commit('UPDATE_VISITED_VIEW', view)
  }
}
