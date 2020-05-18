import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Hamburger extends Vue {
  @Prop({ default: false }) private isActive!: boolean

  private toggleClick() {
    this.$emit('toggleClick')
  }
}
