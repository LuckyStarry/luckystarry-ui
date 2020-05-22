import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
// tslint:disable-next-line: variable-name
@Component
export default class extends Vue {
  @Getter('app/Host')
  public host!: string

  public async mounted() {
    let match = window.location.hash.match(/access_token=([^&]*)/i)
    let token = (match && match[1]) || ''
    if (token) {
      await this.$store.dispatch('user/Callback', () => Promise.resolve({ token }))
      let index = window.location.href.indexOf('#')
      window.location.replace(window.location.href.substr(0, index))
    } else {
      let redirect = this.$route.query.redirect
      if (!redirect) {
        redirect = this.host
      }
      await this.$router.replace(`${redirect}`)
    }
  }
}
