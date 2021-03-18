import { SearchResult } from './../search-result'
export class SearchResultAdapter<T = any> implements SearchResult<T> {
  protected payload?: any
  public constructor(payload: any) {
    this.payload = payload
  }

  public get List(): T[] {
    let list = this.payload?.list
    if (typeof list === 'undefined') {
      list = this.payload?.List
    }
    return list || []
  }

  public get Count(): number {
    let count = this.payload?.count
    if (typeof count === 'undefined') {
      count = this.payload?.Count
    }
    return count || 0
  }
}
