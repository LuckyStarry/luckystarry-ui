import { Component, Vue } from 'vue-property-decorator'
import errGif from './401.gif'

@Component
export default class Page401 extends Vue {
  private errGif = errGif + '?' + +new Date()
  private ewizardClap = 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646'
  private dialogVisible = false

  private async back() {
    if (this.$route.query.noGoBack) {
      await this.$router.push({ path: '/dashboard' })
    } else {
      this.$router.go(-1)
    }
  }
}
