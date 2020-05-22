export interface Token {
  set(token: string): void
  get(): string
  delete(): void
}
