import { Message } from 'element-ui'
import { Message as MESSAGE } from '../../utils/ui/message'

export class MessageHelper implements MESSAGE {
  public async info(message?: string): Promise<any> {
    if (message) {
      return Message.info(message)
    }
    return null
  }

  public async warning(message?: string): Promise<any> {
    if (message) {
      return Message.warning(message)
    }
    return null
  }

  public async error(message?: string): Promise<any> {
    if (message) {
      return Message.error(message)
    }
    return null
  }

  public async success(message?: string): Promise<any> {
    if (message) {
      return Message.success(message)
    }
    return null
  }
}
