import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { addClass, removeClass } from './utils'

@Component
export default class RightPanel extends Vue {
  @Prop({ default: false }) private clickNotClose!: boolean
  @Prop({ default: 250 }) private buttonTop!: number

  private show = false

  @Watch('show')
  private onShowChange(value: boolean) {
    if (value && !this.clickNotClose) {
      this.addEventClick()
    }
    if (value) {
      addClass(document.body, 'showRightPanel')
    } else {
      removeClass(document.body, 'showRightPanel')
    }
  }

  mounted() {
    this.insertToBody()
  }

  beforeDestroy() {
    const elx = this.$refs.rightPanel as Element
    elx.remove()
  }

  private addEventClick() {
    window.addEventListener('click', this.closeSidebar)
  }

  private closeSidebar(ev: MouseEvent) {
    const parent = (ev.target as HTMLElement).closest('.rightPanel')
    if (!parent) {
      this.show = false
      window.removeEventListener('click', this.closeSidebar)
    }
  }

  private insertToBody() {
    const elx = this.$refs.rightPanel as Element
    const body = document.querySelector('body')
    if (body) {
      body.insertBefore(elx, body.firstChild)
    }
  }
}
