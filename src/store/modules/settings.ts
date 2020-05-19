import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface ISettingsState {
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

@Module({ namespaced: true })
export class Settings extends VuexModule implements ISettingsState {
  public fixedHeader = false
  public showSettings = true
  public showTagsView = true
  public showSidebarLogo = true
  public sidebarTextTheme = true

  public get FixedHeader(): boolean {
    return this.fixedHeader
  }

  public get ShowSettings(): boolean {
    return this.showSettings
  }

  public get ShowTagsView(): boolean {
    return this.showTagsView
  }

  public get ShowSidebarLogo(): boolean {
    return this.showSidebarLogo
  }

  public get SidebarTextTheme(): boolean {
    return this.sidebarTextTheme
  }

  @Mutation
  private CHANGE_SETTING(payload: { key: string; value: any }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      let target = this as any
      target[key] = value
    }
  }

  @Action
  public ChangeSetting(payload: { key: string; value: any }) {
    this.context.commit('CHANGE_SETTING', payload)
  }
}
