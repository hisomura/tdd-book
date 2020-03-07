import Money, { dollar, franc } from './money'
import Bank from './bank'
import Expression from './expression'
import Sum from './sum'
import RateMap from './rateMap'

describe('通貨', () => {
  test('掛け算', () => {
    const five: Money = dollar(5)
    expect(five.times(3).equals(dollar(15))).toBeTruthy()
    expect(five.times(2).equals(dollar(10))).toBeTruthy()
  })
  test('等価', () => {
    expect(dollar(5).equals(dollar(5))).toBeTruthy()
    expect(dollar(5).equals(dollar(6))).toBeFalsy()
    expect(franc(5).equals(dollar(5))).toBeFalsy()
  })
  test('通貨名', () => {
    const five: Money = franc(5)
    expect(dollar(1).currency()).toBe('USD')
    expect(franc(1).currency()).toBe('CHF')
  })
  test('足し算', () => {
    const five = dollar(5)
    const sum: Expression = five.plus(five)
    const bank = new Bank()
    const reduced: Money = bank.reduce(sum, 'USD')
    expect(dollar(10).equals(reduced)).toBeTruthy()
  })
  test('plus return sum', () => {
    const five = dollar(5)
    const result: Expression = five.plus(five)
    const sum: Sum = result as Sum
    expect(five.equals(sum.augend)).toBeTruthy()
    expect(five.equals(sum.addend)).toBeTruthy()
  })
  test('reduce sum', () => {
    const sum: Expression = new Sum(dollar(3), dollar(4))
    const bank = new Bank()
    const reduced: Money = bank.reduce(sum, 'USD')
    expect(reduced.equals(dollar(7))).toBeTruthy()
  })
  test('reduce money', () => {
    const bank = new Bank()
    const reduced: Money = bank.reduce(dollar(1), 'USD')
    expect(reduced.equals(dollar(1))).toBeTruthy()
  })

  test('reduce money difference currency', () => {
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const result: Money = bank.reduce(franc(2), 'USD')
    expect(result.equals(dollar(1))).toBeTruthy()
  })

  test('mixed addition', () => {
    const fiveBucks: Expression = dollar(5)
    const tenFrancs: Expression = franc(10)
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const result: Money = bank.reduce(fiveBucks.plus(tenFrancs), 'USD')
    expect(result.equals(dollar(10))).toBeTruthy()
  })

  test('sum plus money', () => {
    const fiveBucks: Expression = dollar(5)
    const tenFrancs: Expression = franc(10)
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const sum: Expression = new Sum(fiveBucks, tenFrancs).plus(fiveBucks)
    const result: Money = bank.reduce(sum, 'USD')
    expect(result.equals(dollar(15))).toBeTruthy()
  })
  test('sum times', () => {
    const fiveBucks: Expression = dollar(5)
    const tenFrancs: Expression = franc(10)
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const sum: Expression = new Sum(fiveBucks, tenFrancs).times(2)
    const result: Money = bank.reduce(sum, 'USD')
    expect(result.equals(dollar(20))).toBeTruthy()
  })

  test('RateMap クラスのテスト equalsメソッドを使った比較ができないのでPairsとMapによる実装の代わりをするクラス', () => {
    const rates = new RateMap()
    rates.put('CHF', 'USD', 2)
    rates.put('JPY', 'USD', 110)
    expect(rates.get('CHF', 'USD')).toBe(2)
    expect(rates.get('JPY', 'USD')).toBe(110)
    expect(rates.get('CNY', 'USD')).toBeUndefined()
  })
})
