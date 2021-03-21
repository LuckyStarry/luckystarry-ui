import { SearchResultAdapter } from './search-result-adapter'

export class SearchResultAdapterFactory {
  public create<T = any>(payload: any): SearchResultAdapter<T> {
    return new SearchResultAdapter(payload)
  }
}
