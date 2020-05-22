import { Profile } from '../../models'
import { Apis } from '../apis'
import { Context } from '../context'

export class DefaultApis implements Apis {
  private context: Context
  public constructor(context: Context) {
    this.context = context
  }

  public profile(): Promise<Profile> {
    throw new Error('Method not implemented.')
  }

  public logout(): Promise<void> {
    return Promise.resolve()
  }
}
