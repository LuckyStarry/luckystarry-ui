export interface SearchResultAdapter<T = any> {
  getList<U = any>(obj: T): U[]
  getCount(obj: T): number
}
