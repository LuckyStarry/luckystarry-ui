import { DAY, HOUR, MINUTE, SECOND } from './units'

export const DEFAULT_FORMAT = '{y}-{m}-{d} {h}:{i}:{s}'

export function toSmartString(time: number | Date): string {
  return getSmartDiff(time, Date.now())
}

export function getSmartDiff(time: number | Date, compared: number | Date): string {
  let a = 0
  if (typeof time === 'number') {
    a = time
  } else {
    a = time.getTime()
  }
  let b = 0
  if (typeof compared === 'number') {
    b = compared
  } else {
    b = compared.getTime()
  }
  let diff = a - b
  let suffix = ''
  if (diff < 0) {
    suffix = '后'
  } else {
    suffix = '前'
  }
  let desc = ''
  let abs = Math.abs(diff)
  if (abs > DAY) {
    desc = `${Math.floor(abs / DAY)} 天`
  } else if (abs > HOUR) {
    desc = `${Math.floor(abs / HOUR)} 小时`
  } else if (abs > MINUTE) {
    desc = `${Math.floor(abs / MINUTE)} 分钟`
  } else {
    desc = `${Math.floor(abs / SECOND)} 秒`
  }
  return `${desc}${suffix}`
}

export const parseTime = (time?: Date | string | number, cFormat?: string): string | null => {
  // tslint:disable-next-line: strict-type-predicates
  if (time === undefined || time === null) {
    return null
  }
  let format = cFormat || DEFAULT_FORMAT
  let date: Date
  if (time instanceof Date) {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time, 10)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  let payload: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = payload[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
}
