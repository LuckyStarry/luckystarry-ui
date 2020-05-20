import { Component, Vue } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { Getter } from 'vuex-class'
import variables from '../../../styles/_variables.scss'
import { SideBarItem, SideBarLogo } from './components'

@Component({ components: { SideBarItem, SideBarLogo } })
export default class SideBar extends Vue {
  @Getter('app/Sidebar')
  public sidebar!: { opened: boolean; withoutAnimation: boolean }

  @Getter('permission/Routes')
  public routes!: RouteConfig[]

  @Getter('settings/ShowSidebarLogo')
  public showLogo!: boolean

  get menuActiveTextColor() {
    if (this.$store.getters['settings/SidebarTextTheme']) {
      // TODO
      return variables.menuActiveText
    } else {
      return variables.menuActiveText
    }
  }

  public get variables() {
    return variables
  }

  public get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }

  public get isCollapse() {
    return !this.sidebar.opened
  }
}
