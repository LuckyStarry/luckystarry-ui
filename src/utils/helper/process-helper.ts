import nprogress from 'nprogress'
import { Process } from '../ui/process'

export class ProcessHelper implements Process {
  public start(): void {
    nprogress.start()
  }
  public done(): void {
    nprogress.done()
  }
}
