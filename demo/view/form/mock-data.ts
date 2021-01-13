import { ItemVo } from './models'

let id = 1
const animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
function data(): ItemVo {
  return { id: id++, name: '王小' + animals[id % 12], province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄' }
}

export const ITEMS: ItemVo[] = [data(), data(), data(), data(), data(), data(), data(), data(), data(), data(), data(), data()]
