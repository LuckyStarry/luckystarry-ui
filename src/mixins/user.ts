import { Component, Vue } from 'vue-property-decorator'
import { IUserState } from '../store/modules'

@Component
export class User extends Vue {
  public get profile(): IUserState {
    return {
      id: this.$store.state['user/ID'],
      token: this.$store.state['user/Token'],
      name: this.$store.state['user/Name'],
      avatar: this.$store.state['user/Avatar'],
      introduction: this.$store.state['user/Introduction'],
      email: this.$store.state['user/Email'],
      roles: this.$store.state['user/Roles'] || []
    }
  }
}
