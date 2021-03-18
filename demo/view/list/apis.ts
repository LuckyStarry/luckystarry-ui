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
      return resolve({ Success: true, Message: '查询成功', Payload: { List: list || [], Count: source.length } })
    }, 500 + Math.random() * 1000)
  })
}
