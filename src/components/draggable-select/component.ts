import { Select } from 'element-ui'
import Sortable from 'sortablejs'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'DraggableSelect' })
export default class DraggableSelect extends Vue {
  @Prop({ required: true }) private value!: string[]
  @Prop({ type: Boolean, default: false })
  private filterable!: boolean
  @Prop({ type: Boolean, default: false })
  private remote!: boolean
  @Prop({ type: Boolean, default: false })
  private reserveKeyword!: boolean
  @Prop({ type: Function, required: false })
  private remoteMethod!: Function
  private sortable: Sortable | null = null

  get selectVal() {
    return [...this.value]
  }

  set selectVal(value) {
    this.$emit('input', [...value])
  }

  mounted() {
    this.setSort()
  }

  private setSort() {
    const draggableSelect = this.$refs.draggableSelect as Select
    const el = draggableSelect.$el.querySelectorAll('.el-select__tags > span')[0] as HTMLElement
    this.sortable = Sortable.create(el, {
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder
      onEnd: evt => {
        if (typeof evt.oldIndex !== 'undefined' && typeof evt.newIndex !== 'undefined') {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0]
          this.value.splice(evt.newIndex, 0, targetRow)
          this.selectVal = this.value
        }
      }
    })
  }
}
