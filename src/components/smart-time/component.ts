import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: SmartTime.name })
export default class SmartTime extends Vue {
  @Prop({ type: Number, required: true })
  public value!: number
}
