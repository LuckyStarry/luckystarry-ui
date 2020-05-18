import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Settings extends Vue {
  public get fixedHeader(): boolean {
    return this.$store.getters['settings/FixedHeader']
  }

  public set fixedHeader(value) {
    // tslint:disable-next-line: no-floating-promises
    this.$store.dispatch('settings/ChangeSetting', {
      key: 'fixedHeader',
      value
    })
  }

  public get showTagsView() {
    return this.$store.getters['settings/ShowTagsView']
  }

  public set showTagsView(value) {
    // tslint:disable-next-line: no-floating-promises
    this.$store.dispatch('settings/ChangeSetting', {
      key: 'showTagsView',
      value
    })
  }

  public get showSidebarLogo() {
    return this.$store.getters['settings/ShowSidebarLogo']
  }

  public set showSidebarLogo(value) {
    // tslint:disable-next-line: no-floating-promises
    this.$store.dispatch('settings/ChangeSetting', {
      key: 'showSidebarLogo',
      value
    })
  }

  public get sidebarTextTheme() {
    return this.$store.getters['settings/SidebarTextTheme']
  }

  public set sidebarTextTheme(value) {
    // tslint:disable-next-line: no-floating-promises
    this.$store.dispatch('settings/ChangeSetting', {
      key: 'sidebarTextTheme',
      value
    })
  }
}
