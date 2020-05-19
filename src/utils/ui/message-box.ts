import { MessageType } from './message-type'

export interface MessageBox {
  confirm(
    message: string,
    title?: string,
    option?: {
      confirmButtonText?: string
      cancelButtonText?: string
      type?: MessageType
    }
  ): Promise<any>

  alert(
    message: string,
    title?: string,
    option?: {
      confirmButtonText?: string
      cancelButtonText?: string
      type?: MessageType
    }
  ): Promise<any>
}
