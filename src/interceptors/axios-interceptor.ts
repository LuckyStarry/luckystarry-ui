import { v4 as uuid } from 'uuid'
import { ResponseAdapter } from '../utils'
import { AxiosInterceptContext } from './axios-intercept-context'

export class AxiosInterceptor {
  private adapter: ResponseAdapter
  public constructor(adapter?: ResponseAdapter) {
    this.adapter = adapter || { isSuccessful: obj => obj && obj.Success, getMessage: obj => obj && obj.Message, getPayload: obj => obj && obj.Entity }
  }

  public intercept(context: AxiosInterceptContext) {
    if (!context.axios) {
      return
    }

    context.axios.interceptors.request.use(
      config => {
        if (context.store.state.user.token) {
          config.headers['Authorization'] = `Berear ${context.store.state.user.token}`
          config.headers['X-Access-Token'] = context.store.state.user.token
        }
        config.headers['X-Ca-Nonce'] = uuid()
        return config
      },
      error => {
        // tslint:disable-next-line: no-floating-promises
        Promise.reject(error)
      }
    )

    context.axios.interceptors.response.use(
      response => {
        if (response.status !== 200) {
          switch (response.status) {
            case 401:
              if (context.messagebox) {
                // tslint:disable-next-line: no-floating-promises
                context.messagebox
                  .confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                  })
                  .then(async () => {
                    await context.store.dispatch('user/ResetToken')
                    location.reload()
                  })
              }
              break
            case 403:
              if (context.messagebox) {
                // tslint:disable-next-line: no-floating-promises
                context.messagebox.alert('您的权限不足', '权限不足', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                })
              }
              break
          }
        } else {
          let data = response.data
          if (!this.adapter.isSuccessful(data)) {
            if (context.message) {
              // tslint:disable-next-line: no-floating-promises
              context.message.error(this.adapter.getMessage(data) || 'Error')
            }
            return Promise.reject(response.data)
          } else {
            if (this.adapter.getMessage(data)) {
              if (context.message) {
                // tslint:disable-next-line: no-floating-promises
                context.message.success(this.adapter.getMessage(data))
              }
            }
            return response.data
          }
        }
      },
      error => {
        if (context.message) {
          // tslint:disable-next-line: no-floating-promises
          context.message.error(error.message || 'Error')
          return Promise.reject(error)
        }
      }
    )
  }
}
