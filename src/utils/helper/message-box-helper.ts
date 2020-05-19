import { MessageBox } from 'element-ui'
import { MessageBox as MESSAGEBOX } from '../ui/message-box'
import { MessageType } from '../ui/message-type'

export class MessageBoxHelper implements MESSAGEBOX {
  public async confirm(
    message: string,
    title?: string,
    option?: {
      confirmButtonText?: string
      cancelButtonText?: string
      type?: MessageType
    }
  ): Promise<any> {
    return MessageBox.confirm(message, title || '', option || ({} as any))
  }

  public async alert(
    message: string,
    title?: string,
    option?: {
      confirmButtonText?: string
      cancelButtonText?: string
      type?: MessageType
    }
  ): Promise<any> {
    return MessageBox.alert(message, title || '', option || ({} as any))
  }
}
