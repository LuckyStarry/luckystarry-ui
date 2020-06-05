export default {
  route: {
    ['dashboard']: '首页',
    ['profile']: '个人中心'
  },
  navbar: {
    ['log-out']: '退出登录',
    ['dashboard']: '首页',
    ['theme']: '换肤',
    ['size']: '布局大小',
    ['profile']: '个人中心'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    thirdparty: '第三方登录',
    tips: '为了保证数据安全，目前只支持第三方登陆方式进入系统。',
    ['reading-callback']: '正在读取登陆信息，请稍候……',
    ['reading-error']: '登陆出错，请重新尝试。',
    ['back-to-home']: '返回首页'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    showTagsView: '显示 Tags-View',
    showSidebarLogo: '显示侧边栏 Logo',
    fixedHeader: '固定 Header',
    sidebarTextTheme: '侧边栏文字主题色'
  },
  ['tags-view']: {
    refresh: '刷新页面',
    close: '关闭页面',
    closeOthers: '关闭其他页面',
    closeAll: '关闭所有页面'
  },
  common: {
    filter: {
      search: '查询',
      create: '新增'
    },
    form: {
      ['validator']: {
        ['required']: '不可为空，请按照要求填写。',
        ['must-input']: '不可为空，请按照要求填写。',
        ['must-choice']: '不可为空，请按照要求选择。',
        ['must-upload']: '不可为空，请按照要求上传。',
        ['duplicated']: '已存在，请更换并重试。'
      },
      ['save']: '保存'
    },
    table: {
      action: '',
      edit: '编辑',
      save: '保存',
      view: '查看',
      cancel: '取消',
      delete: '删除'
    },
    system: {
      ['error']: '系统出现异常，请重新操作。',
      ['not-implement']: '暂未实现该功能，敬请期待。'
    }
  }
}
