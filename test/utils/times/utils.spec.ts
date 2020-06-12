/* tslint:disable */
import { expect } from 'chai'
import { parseTime, toSmartString } from '../../../src/utils/times/utils'
let offset = new Date().getTimezoneOffset()
let hours = Math.floor(offset / 60)
console.log(`时差：${offset} 分钟，合计：${hours} 小时`)

describe('src/utils/times/utils', function() {
  it('toSmartString is function', function() {
    expect(typeof toSmartString).is.equals('function')
  })

  it('parseTime is function', function() {
    expect(typeof parseTime).is.equals('function')
  })

  it('parseTime() => null', function() {
    expect(parseTime()).is.null
  })

  it('parseTime(null) => null', function() {
    expect(parseTime(null as any)).is.null
  })
})
