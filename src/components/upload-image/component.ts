import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: UploadImage.name })
export default class UploadImage extends Vue {
  @Prop({ default: '' }) private value!: string
  @Prop({ required: true }) private url!: string
  @Prop({ required: true }) private field!: string
  @Prop({ default: 300 }) private width!: number
  @Prop({ default: 300 }) private height!: number
  @Prop({ default: () => {} }) private params!: object
  @Prop({ default: () => {} }) private headers!: object

  private emitInput(value: string) {
    this.$emit('input', value)
  }

  private rmImage() {
    this.emitInput('')
  }

  private handleImageFail(err: any, file: any, fileList: any) {
    this.$emit('upload-fail', err)
  }

  private handleImageSuccess(res: any) {
    this.$emit('upload-success', res, this.field)
  }
}
