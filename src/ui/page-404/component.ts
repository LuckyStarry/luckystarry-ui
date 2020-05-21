import { Component, Vue } from 'vue-property-decorator'
import page404 from './404.png'
import page404Cloud from './404-cloud.png'

@Component({ name: 'Page404' })
export default class Page404 extends Vue {
  private page404 = page404 + '?' + +new Date()
  private page404Cloud = page404Cloud + '?' + +new Date()
  private message = '404 Page Not Found'
}
