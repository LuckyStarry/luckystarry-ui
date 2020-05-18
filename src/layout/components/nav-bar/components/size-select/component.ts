import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class SizeSelect extends Vue {
  private sizeOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Medium', value: 'medium' },
    { label: 'Small', value: 'small' },
    { label: 'Mini', value: 'mini' }
  ]

  @Getter('app/Size')
  public size!: string

  private async handleSetSize(size: string) {
    ;(this as any).$ELEMENT.size = size
    await this.$store.dispatch('app/SetSize', size)
    await this.refreshView()
  }

  private async refreshView() {
    // In order to make the cached page re-rendered
    await this.$store.dispatch('tagsView/delAllCachedViews')
    const { fullPath } = this.$route
    this.$nextTick(async () => {
      await this.$router.replace({
        path: '/redirect' + fullPath
      })
    })
  }
}
