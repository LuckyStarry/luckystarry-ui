import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({ name: 'Dashboard' })
export default class Dashboard extends Vue {
  @Getter('app/Title')
  private title!: string
}
