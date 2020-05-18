import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({ name: 'ErrorLog' })
export default class extends Vue {
  private dialogTableVisible = false

  @Getter('errorLog/Logs')
  public errorLogs!: Array<any>

  private async clearAll() {
    this.dialogTableVisible = false
    await this.$store.dispatch('errorLog/ClearErrorLog')
  }
}
