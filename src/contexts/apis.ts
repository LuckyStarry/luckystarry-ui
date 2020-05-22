import { Profile } from '../models'

export interface Apis {
  profile(): Promise<Profile>
  logout(): Promise<void>
}
