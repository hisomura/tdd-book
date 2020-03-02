import Money, { dollar, franc } from './money'
import Bank from './bank'
import Expression from './expression'

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
})
