import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Resize } from '../mixins'
import { DeviceType } from '../store'
import {
  AppMain,
  NavBar,
  RightPanel,
  Settings,
  SideBar,
  TagsView
} from './components'

@Component({
  components: {
    AppMain,
    NavBar,
    RightPanel,
    Settings,
    SideBar,
    TagsView
  }
})
export default class Layout extends mixins(Resize) {
  public get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    }
  }

  @Getter('settings/ShowSettings')
  public showSettings!: boolean
  @Getter('settings/ShowTagsView')
  public showTagsView!: boolean
  @Getter('settings/FixedHeader')
  public fixedHeader!: boolean

  private async handleClickOutside() {
    await this.$store.dispatch('app/CloseSideBar', false)
  }
}
