export const AxiosHeaderBuilder = Symbol('AxiosHeaderBuilder')
export interface AxiosHeaderBuilder {
  build(headers: { [key: string]: string }): void
}
