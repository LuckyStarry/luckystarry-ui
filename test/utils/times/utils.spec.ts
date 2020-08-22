/* tslint:disable */
import { expect } from 'chai'
import { getSmartDiff, parseTime, toSmartString } from '../../../src/utils/times/utils'
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

  // it(`parseTime('1597907865880') => '2020-08-20 15:17:45'`, function() {
  //   expect(parseTime('1597907865880')).is.equals('2020-08-20 15:17:45')
  // })

  // it(`parseTime(1597907865880) => '2020-08-20 15:17:45'`, function() {
  //   expect(parseTime(1597907865880)).is.equals('2020-08-20 15:17:45')
  // })

  // it(`parseTime(new Date(1597907865880)) => '2020-08-20 15:17:45'`, function() {
  //   expect(parseTime(new Date(1597907865880))).is.equals('2020-08-20 15:17:45')
  // })

  // it(`parseTime(1597907865880, '{y}-{m}-{d} {h}:{i}:{s} | {a}') => '2020-08-20 15:17:45 | 四'`, function() {
  //   expect(parseTime(1597907865880, '{y}-{m}-{d} {h}:{i}:{s} | {a}')).is.equals('2020-08-20 15:17:45 | 四')
  // })

  // it(`parseTime(1597907865880, '{d}/{m}/{y} {h}-{i}-{s} <{a}>') => '20/08/2020 15-17-45 <四>'`, function() {
  //   expect(parseTime(1597907865880, '{d}/{m}/{y} {h}-{i}-{s} <{a}>')).is.equals('20/08/2020 15-17-45 <四>')
  // })

  it('getSmartDiff(0, 0) => 0 秒前', function() {
    expect(getSmartDiff(0, 0)).is.equals('0 秒前')
  })

  it('getSmartDiff(1000, 0) => 1 秒前', function() {
    expect(getSmartDiff(1000, 0)).is.equals('1 秒前')
  })

  it('getSmartDiff(0, 1000) => 1 秒后', function() {
    expect(getSmartDiff(0, 1000)).is.equals('1 秒后')
  })

  it('getSmartDiff(new Date(), new Date(Date.now() + 60000)) => 60 秒后', function() {
    let now = Date.now()
    expect(getSmartDiff(new Date(now), new Date(now + 60000))).is.equals('60 秒后')
  })

  it('getSmartDiff(new Date(), new Date(Date.now() + 60001)) => 1 分钟后', function() {
    let now = Date.now()
    expect(getSmartDiff(new Date(now), new Date(now + 60001))).is.equals('1 分钟后')
  })

  it('getSmartDiff(new Date(Date.now() + 3600000), new Date()) => 60 分钟前', function() {
    let now = Date.now()
    expect(getSmartDiff(new Date(now + 3600000), new Date(now))).is.equals('60 分钟前')
  })

  it('getSmartDiff(new Date(Date.now() + 3600001), new Date()) => 1 小时前', function() {
    let now = Date.now()
    expect(getSmartDiff(new Date(now + 3600001), new Date(now))).is.equals('1 小时前')
  })

  it('getSmartDiff(new Date(Date.now() + 86400000), new Date()) => 24 小时前', function() {
    let now = Date.now()
    expect(getSmartDiff(new Date(now + 86400000), new Date(now))).is.equals('24 小时前')
  })

  it('getSmartDiff(new Date(Date.now() + 86400001), new Date()) => 1 天前', function() {
    let now = Date.now()
    expect(getSmartDiff(new Date(now + 86400001), new Date(now))).is.equals('1 天前')
  })

  it('toSmartString(new Date(Date.now() - 86400001)) => 1 天前', function() {
    let now = Date.now()
    expect(toSmartString(new Date(now - 86400001))).is.equals('1 天前')
  })
})
