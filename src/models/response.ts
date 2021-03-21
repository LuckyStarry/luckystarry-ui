export interface Response<T = any> {
  readonly Success: boolean
  readonly Message: string
  readonly Payload: T
}
