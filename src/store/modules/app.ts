import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Context } from '../../context'
import { DeviceType } from '../device-type'
import { IRootState } from '../root-state'

export interface IAppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  size: string
  title: string
  logo: string
  language: string
  device: DeviceType
}

@Module({ namespaced: true })
export class App extends VuexModule<IAppState, IRootState> implements IAppState {
  public sidebar = {
    opened: true,
    withoutAnimation: false
  }

  public device = DeviceType.Desktop
  public size = 'mini'
  public title = ''
  public logo = ''
  public language = 'zh'

  public get Sidebar() {
    return this.sidebar
  }

  public get Size(): string {
    return this.size
  }

  public get Device(): DeviceType {
    return this.device
  }

  public get Title(): string {
    return this.title
  }

  public get Logo(): string {
    return this.logo
  }

  public get Language(): string {
    return this.language
  }

  @Mutation
  private TOGGLE_SIDEBAR(payload: { withoutAnimation: boolean; context: Context }) {
    this.sidebar.opened = !this.sidebar.opened
    this.sidebar.withoutAnimation = payload.withoutAnimation
    if (this.sidebar.opened) {
      payload.context.system.setSidebarStatus('opened')
    } else {
      payload.context.system.setSidebarStatus('closed')
    }
  }

  @Mutation
  private CLOSE_SIDEBAR(payload: { withoutAnimation: boolean; context: Context }) {
    this.sidebar.opened = false
    this.sidebar.withoutAnimation = payload.withoutAnimation
    payload.context.system.setSidebarStatus('closed')
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Mutation
  private SET_SIZE(payload: { size: string; context: Context }) {
    this.size = payload.size
    payload.context.system.setSize(this.size)
  }

  @Mutation
  private SET_LANGUAGE(payload: { language: string; context: Context }) {
    this.language = payload.language
    payload.context.system.setLanguage(this.language)
  }

  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.context.commit('TOGGLE_SIDEBAR', { withoutAnimation, context: this.context.rootState.context })
  }

  @Action
  public CloseSideBar(withoutAnimation: boolean) {
    this.context.commit('CLOSE_SIDEBAR', { withoutAnimation, context: this.context.rootState.context })
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.context.commit('TOGGLE_DEVICE', device)
  }

  @Action
  public SetSize(size: string) {
    this.context.commit('SET_SIZE', { size, context: this.context.rootState.context })
  }

  @Action
  public SetLanguage(language: string) {
    this.context.commit('SET_LANGUAGE', { language, context: this.context.rootState.context })
  }
}
