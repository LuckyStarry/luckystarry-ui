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

export const parseTime = (time?: object | string | number, cFormat?: string): string | null => {
  if (time === undefined) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time, 10)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}
