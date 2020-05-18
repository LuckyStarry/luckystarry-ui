import { Component, Prop, Vue } from 'vue-property-decorator'
import { isExternal } from './utils'

@Component
export default class SidebarItemLink extends Vue {
  @Prop({ required: true }) private to!: string

  private isExternal = isExternal
}
