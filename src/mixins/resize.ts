import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { DeviceType } from '../store/device-type'

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component
export class Resize extends Vue {
  @Getter('app/Sidebar')
  public sidebar!: { opened: boolean; withoutAnimation: boolean }

  @Getter('app/Device')
  public device!: DeviceType

  @Watch('$route')
  private async onRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      await this.$store.dispatch('app/CloseSideBar', false)
    }
  }

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  public async mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      await this.$store.dispatch('app/ToggleDevice', DeviceType.Mobile)
      await this.$store.dispatch('app/CloseSideBar', true)
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  private async resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      await this.$store.dispatch(
        'app/ToggleDevice',
        isMobile ? DeviceType.Mobile : DeviceType.Desktop
      )
      if (isMobile) {
        await this.$store.dispatch('app/CloseSideBar', true)
      }
    }
  }
}
