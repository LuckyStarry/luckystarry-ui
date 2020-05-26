import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({ name: 'MaterialInput' })
export default class MaterialInput extends Vue {
  @Prop({ required: true }) private value!: any
  @Prop({ default: 'text' }) private type!: string
  @Prop({ default: '' }) private id!: string
  @Prop({ default: '' }) private icon!: string
  @Prop({ default: '' }) private name!: string
  @Prop({ default: '' }) private placeholder!: string
  @Prop({ default: false }) private readonly!: boolean
  @Prop({ default: false }) private disabled!: boolean
  @Prop({ default: true }) private required!: boolean
  @Prop({ default: 'off' }) private autoComplete!: string
  @Prop({ default: 0 }) private min!: number | Date
  @Prop({ default: 10000 }) private max!: number | Date
  @Prop({ default: 1 }) private step!: number
  @Prop({ default: 0 }) private minlength!: number
  @Prop({ default: 20 }) private maxlength!: number
  @Prop({ default: true }) private validateEvent!: boolean

  private valueCopy = this.value
  private focus = false

  @Watch('value')
  private onValueChange(value: any) {
    this.valueCopy = value
  }

  get computedClasses() {
    return {
      'material--active': this.focus,
      'material--disabled': this.disabled,
      'material--raised': Boolean(this.focus || this.valueCopy)
    }
  }

  get filledPlaceholder() {
    if (this.focus) {
      return this.placeholder
    }
    return ''
  }

  private handleInput(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value
    this.$emit('input', value)
    if (this.$parent.$options.name === 'ElFormItem') {
      if (this.validateEvent) {
        this.$parent.$emit('el.form.change', [value])
      }
    }
  }

  private handleFocus(event: FocusEvent) {
    this.focus = true
    this.$emit('focus', event)
  }

  private handleBlur(event: FocusEvent) {
    this.focus = false
    this.$emit('blur', event)
    if (this.$parent.$options.name === 'ElFormItem') {
      if (this.validateEvent) {
        this.$parent.$emit('el.form.blur', [this.valueCopy])
      }
    }
  }
}
