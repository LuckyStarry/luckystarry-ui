import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import { Getter } from 'vuex-class'
import { Context } from '../../contexts'

@Component({ name: 'Login' })
export default class Login extends Vue {
  private loading = false
  private showDialog = false
  private capsTooltip = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  @Prop({ type: String, default: 'simple' })
  public oauthType!: string

  @Getter('app/Host')
  public host!: string

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  private checkCapslock(e: KeyboardEvent) {
    const { key } = e
    this.capsTooltip = key.length === 1 && key >= 'A' && key <= 'Z'
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }

  public async login() {
    let context: Context = this.$store.state.context
    let payload = { host: this.host, path: this.$route.path, query: this.$route.query, params: this.$route.params, hash: this.$route.hash }
    let uri = await context.oauth.authorize(this.oauthType, payload)
    window.location.replace(uri)
  }

  public async mounted() {
    if (!sessionStorage.getItem('luckystarry.login.state')) {
      sessionStorage.setItem('luckystarry.login.state', 'ON')
      await this.login()
    }
  }
}
