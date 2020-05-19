import Vue from 'vue'
import Vuex from 'vuex'
import { App, ErrorLog, Permission, Settings, TagsView, User } from './modules'
export { DeviceType } from './device-type'
export { IRootState } from './root-state'
export { ITagView } from './tags-view'
export { App }
export { ErrorLog }
export { Permission }
export { Settings }
export { TagsView }
export { User }

Vue.use(Vuex)
