import { Component, Vue } from 'vue-property-decorator'
import { IUserState } from '../store/modules'

@Component
export class User extends Vue {
  public get profile(): IUserState {
    return {
      id: this.$store.getters['user/ID'],
      token: this.$store.getters['user/Token'],
      name: this.$store.getters['user/Name'],
      avatar: this.$store.getters['user/Avatar'],
      introduction: this.$store.getters['user/Introduction'],
      email: this.$store.getters['user/Email'],
      roles: this.$store.getters['user/Roles'] || []
    }
  }
}
