import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'Redirect' })
export default class Redirect extends Vue {
  async created() {
    const { params, query } = this.$route
    const { path } = params
    await this.$router.replace({ path: '/' + path, query })
  }

  render() {
    // Avoid warning for missing template
  }
}
