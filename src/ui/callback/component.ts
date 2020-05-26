import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Context } from '../../contexts'
// tslint:disable-next-line: variable-name
@Component
export default class extends Vue {
  @Getter('app/Host')
  public host!: string

  @Prop({ type: String, default: 'simple' })
  public oauthType!: string

  public async mounted() {
    let context: Context = this.$store.state.context
    let payload = { host: this.host, path: this.$route.path, query: this.$route.query, params: this.$route.params, hash: this.$route.hash }
    let uri = await context.oauth.callback(this.oauthType, payload)
    if (!uri) {
      uri = this.host
    }
    window.location.replace(uri)
  }
}
