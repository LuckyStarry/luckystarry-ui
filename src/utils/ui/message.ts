export interface Message {
  info(message?: string): Promise<any>
  warning(message?: string): Promise<any>
  error(message?: string): Promise<any>
  success(message?: string): Promise<any>
}
