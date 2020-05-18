import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import {
  Breadcrumb,
  ErrorLog,
  Hamburger,
  HeaderSearch,
  Screenfull,
  SizeSelect
} from './components'

@Component({
  components: {
    Breadcrumb,
    ErrorLog,
    Hamburger,
    HeaderSearch,
    Screenfull,
    SizeSelect
  }
})
export default class Navbar extends Vue {
  @Getter('app/Sidebar')
  public sidebar!: { opened: boolean; withoutAnimation: boolean }

  @Getter('user/Avatar')
  public avatar!: string

  public get device() {
    return `${this.$store.getters['app/Device']}`
  }

  private async toggleSideBar() {
    await this.$store.dispatch('app/ToggleSideBar', false)
  }

  private async logout() {
    await this.$store.dispatch('user/LogOut')
    await this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  }
}
