import { Component, Vue } from 'vue-property-decorator'
import { utils } from '../../../src'

@Component
export default class extends Vue {
  public async mounted() {
    await utils.times.delay(utils.times.units.SECOND * 3)
    const redirect_uri = this.$route.query.redirect_uri || '/'
    this.$router.replace(`${redirect_uri}#access_token=${Date.now()}`)
  }
}
