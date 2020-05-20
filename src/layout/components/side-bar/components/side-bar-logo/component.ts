import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class SidebarLogo extends Vue {
  @Prop({ required: true })
  private collapse!: boolean

  @Getter('app/Title')
  private title!: string

  @Getter('app/Logo')
  private logo!: string
}
