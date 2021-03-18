import { Message, MessageBox } from 'element-ui'
import { AxiosInterceptContext } from './axios-intercept-context'

export class AxiosInterceptor {
  public intercept(context: AxiosInterceptContext) {
    if (!context.axios) {
      return
    }

    context.axios.interceptors.request.use(
      config => {
        config.headers = config.headers || {}
        if (context.headers && context.headers.length) {
          for (let builder of context.headers) {
            builder.build(config.headers)
          }
        }
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
              // tslint:disable-next-line: no-floating-promises
              MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                await context.store.dispatch('user/ResetToken')
                location.reload()
              })
              break
            case 403:
              // tslint:disable-next-line: no-floating-promises
              MessageBox.alert('您的权限不足', '权限不足', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
              break
          }
        } else {
          let data = context.factory.create(response.data)
          if (!data.Success) {
            // tslint:disable-next-line: no-floating-promises
            Message.warning(data.Message || '您的操作不成功。')
            return Promise.reject(response.data)
          } else {
            if (data.Message) {
              // tslint:disable-next-line: no-floating-promises
              Message.success(data.Message)
            }
            return response.data
          }
        }
      },
      error => {
        // tslint:disable-next-line: no-floating-promises
        Message.error(error.message || '您的操作出错了，请稍候再试。')
        return Promise.reject(error)
      }
    )
  }
}
