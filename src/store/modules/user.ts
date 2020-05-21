import { RouteConfig } from 'vue-router'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { IRootState } from '../root-state'

export interface IUserState {
  id: string
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

@Module({ namespaced: true })
export class User extends VuexModule<IUserState, IRootState> implements IUserState {
  public token = ''
  public id = ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []
  public email = ''

  public get Token(): string {
    return this.token || ''
  }

  public get ID(): string {
    return this.id || ''
  }

  public get Name(): string {
    return this.name || ''
  }

  public get Avatar(): string {
    return this.avatar || ''
  }

  public get Introduction(): string {
    return this.introduction || ''
  }

  public get Email(): string {
    return this.email || ''
  }

  public get Roles(): string[] {
    return this.roles || []
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_ID(id: string) {
    this.id = id
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Action
  public async Callback(getToken: () => Promise<{ token: string }>) {
    let data = await getToken()
    this.context.rootState.context.token.set(data.token)
    this.context.commit('SET_TOKEN', data.token)
  }

  @Action
  public ResetToken() {
    this.context.rootState.context.token.delete()
    this.context.commit('SET_TOKEN', '')
    this.context.commit('SET_ROLES', [])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    let response = await this.context.rootState.context.apis.getProfile()
    if (!response) {
      throw Error('Verification failed, please Login again.')
    }
    let roles: string[] = []
    if (response.RoleIDs) {
      roles = [...response.RoleIDs]
    }
    if (!roles.length) {
      roles = ['visitor']
    }
    let id = response.UserID
    let avatar = response.UserAvatar
    let introduction = ''
    let email = ''
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.context.commit('SET_ROLES', roles || [])
    this.context.commit('SET_ID', id)
    this.context.commit('SET_NAME', name)
    this.context.commit('SET_AVATAR', avatar)
    this.context.commit('SET_INTRODUCTION', introduction)
    this.context.commit('SET_EMAIL', email)
  }

  @Action
  public async ChangeRoles(role: string) {
    const token = role + '-token'
    this.context.commit('SET_TOKEN', token)
    this.context.rootState.context.token.set(token)
    await this.GetUserInfo()
    this.context.rootState.context.routes.reset()
    await this.context.dispatch('premission/GenerateRoutes', this.roles, { root: true })
    let dynamicRoutes: RouteConfig[] = this.context.getters['premission/Dynamic']
    this.context.rootState.context.routes.add(...dynamicRoutes)
    await this.context.dispatch('tagsView/delAllViews', null, { root: true })
  }

  @Action
  public async LogOut() {
    if (this.context.state.token === '') {
      console.error('LogOut: token is undefined!')
      this.context.rootState.context.token.delete()
      this.context.rootState.context.routes.reset()
      await this.context.dispatch('tagsView/delAllViews', null, { root: true })
      this.context.commit('SET_TOKEN', '')
      this.context.commit('SET_ROLES', [])
      return
    }

    await this.context.rootState.context.apis.logout()
    this.context.rootState.context.token.delete()
    this.context.rootState.context.routes.reset()

    await this.context.dispatch('tagsView/delAllViews', null, { root: true })
    this.context.commit('SET_TOKEN', '')
    this.context.commit('SET_ROLES', [])
  }
}
