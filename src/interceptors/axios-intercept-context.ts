import { AxiosInstance } from 'axios'
import { Store } from 'vuex'
import { IRootState } from '../store'
import { ui } from '../utils'

export interface AxiosInterceptContext {
  message: ui.Message
  messagebox: ui.MessageBox
  axios: AxiosInstance
  store: Store<IRootState>
}
