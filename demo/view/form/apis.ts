import { ItemVo, SearchDTO } from './models'
import { models } from '../../../src'
import { ITEMS } from './mock-data'
import 'luckystarry-collections'

export async function search(model: SearchDTO): Promise<models.Response<models.SearchResult<ItemVo>>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let source = ITEMS
      if (model.name) {
        source = source.filter(x => x.name.includes(model.name))
      }
      let list = source
        .Skip((model.index - 1) * model.size)
        .Take(model.size)
        .ToArray()
        .map(x => Object.assign({}, x))
      return resolve({ Success: true, Message: '查询成功', Entity: { List: list || [], Count: source.length } })
    }, 500 + Math.random() * 1000)
  })
}

export async function load(id: number): Promise<models.Response<ItemVo>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let source = ITEMS.find(x => x.id === id)
      if (source) {
        return resolve({ Success: true, Message: '查询成功', Entity: source })
      } else {
        return resolve({ Success: false, Message: '未查询到用户数据', Entity: null as any })
      }
    }, 500 + Math.random() * 1000)
  })
}
