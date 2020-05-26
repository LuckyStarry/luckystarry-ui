export interface ResponseAdapter<T = any> {
  isSuccessful(obj: T): boolean
  getMessage(obj: T): string
  getPayload<U = any>(obj: T): U
}
