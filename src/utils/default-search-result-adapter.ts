import { SearchResultAdapter } from './search-result-adapter'

export class DefaultSearchResultAdapter<T = any> implements SearchResultAdapter<T> {
  public getList<U = any>(obj: T): U[] {
    if (obj) {
      return (obj as any).List || []
    }
    return []
  }

  public getCount(obj: T): number {
    if (obj) {
      return (obj as any).Count || 0
    }
    return 0
  }
}
