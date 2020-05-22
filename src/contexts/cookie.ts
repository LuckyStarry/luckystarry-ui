export interface Cookie {
  set(key: string, value: String, payload?: { expiry?: Date; domain?: string }): void
  get(key: string): string
  delete(key: string): void
  prefix: string
}
