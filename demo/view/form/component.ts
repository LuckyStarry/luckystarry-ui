import { Component, Vue } from 'vue-property-decorator'
import { ui } from '../../../src'
import * as apis from './apis'
import { SearchDTO } from './models'

@Component({ components: { List: ui.List } })
export default class FormPage extends Vue {
  private criteria: SearchDTO = new SearchDTO()
  private apis = apis
}
