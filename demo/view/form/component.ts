import { Component, Vue } from 'vue-property-decorator'
import { ui } from '../../../src'
import * as apis from './apis'

@Component({ components: { LsForm: ui.Form } })
export default class FormPage extends Vue {
  private apis = apis
  private subject: any = {}
  public async load() {}
}
