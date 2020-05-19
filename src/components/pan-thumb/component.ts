import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: PanThumb.name })
export default class PanThumb extends Vue {
  @Prop({ required: true }) private image!: string
  @Prop({ default: '150px' }) private width!: string
  @Prop({ default: '150px' }) private height!: string
  @Prop({ default: 1 }) private zIndex!: number
}
