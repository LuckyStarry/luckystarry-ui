import screenfull from 'screenfull'
import { Component, Vue } from 'vue-property-decorator'

const sf = screenfull

@Component
export default class Screenfull extends Vue {
  private isFullscreen = false

  mounted() {
    if (sf.isEnabled) {
      sf.on('change', this.change)
    }
  }

  beforeDestory() {
    if (sf.isEnabled) {
      sf.off('change', this.change)
    }
  }

  private change() {
    if (sf.isEnabled) {
      this.isFullscreen = sf.isFullscreen
    }
  }

  private async click() {
    if (!sf.isEnabled) {
      return false
    }
    await sf.toggle()
  }
}
