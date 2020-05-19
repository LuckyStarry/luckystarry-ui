import { Context } from '../context'
import {
  IAppState,
  IErrorLogState,
  IPermissionState,
  ISettingsState,
  ITagsViewState,
  IUserState
} from './modules'

export interface IRootState {
  app: IAppState
  user: IUserState
  tagsView: ITagsViewState
  errorLog: IErrorLogState
  permission: IPermissionState
  settings: ISettingsState
  context: Context
}
