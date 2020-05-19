import { DAY, HOUR, MINUTE, SECOND } from './units'

export function toSmartString(time: number | Date): string {
  let timestamp = 0
  if (typeof time === 'number') {
    timestamp = time
  } else {
    timestamp = time.getTime()
  }
  let now = Date.now()
  let diff = now - timestamp
  let suffix = ''
  if (diff < 0) {
    suffix = '后'
  } else {
    suffix = '前'
  }
  let desc = ''
  let abs = Math.abs(diff)
  if (abs > DAY) {
    desc = `${Math.floor(diff / DAY)} 天`
  } else if (abs > HOUR) {
    desc = `${Math.floor(diff / HOUR)} 小时`
  } else if (abs > MINUTE) {
    desc = `${Math.floor(diff / MINUTE)} 分钟`
  } else {
    desc = `${Math.floor(diff / SECOND)} 秒`
  }
  return `${desc}${suffix}`
}
