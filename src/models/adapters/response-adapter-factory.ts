import { ResponseAdapter } from './response-adapter'

export class ResponseAdapterFactory {
  public create<T = any>(response: any): ResponseAdapter<T> {
    return new ResponseAdapter(response)
  }
}
