import { models } from '../../../src'

export class SearchDTO extends models.Pagination {
  public name: string = ''
  public constructor() {
    super()
    this.size = 10
  }
}

export interface ItemVo {
  id: number
  name: string
  province: string
  city: string
  address: string
}
