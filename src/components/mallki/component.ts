import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'Mallki' })
export default class Mallki extends Vue {
  @Prop({ default: '' }) private className!: string
  @Prop({ default: 'vue-typescript-admin' }) private text!: string
}
