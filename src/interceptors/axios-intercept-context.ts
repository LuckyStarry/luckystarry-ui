import { adapters } from '@/models'
import { IRootState } from '@/store'
import { AxiosInstance } from 'axios'
import { Store } from 'vuex'
import { AxiosHeaderBuilder } from './axios-header-builder'

export interface AxiosInterceptContext {
  axios: AxiosInstance
  store: Store<IRootState>
  factory: adapters.ResponseAdapterFactory
  headers: AxiosHeaderBuilder[]
}
