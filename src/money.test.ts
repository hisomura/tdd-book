import Money, { dollar, franc } from './money'

describe('通貨', () => {
  test('ドルの掛け算', () => {
    const five: Money = dollar(5)
    expect(five.times(3).equals(dollar(15))).toBeTruthy()
    expect(five.times(2).equals(dollar(10))).toBeTruthy()
  })
  test('等価', () => {
    expect(dollar(5).equals(dollar(5))).toBeTruthy()
    expect(dollar(5).equals(dollar(6))).toBeFalsy()
    expect(franc(5).equals(franc(5))).toBeTruthy()
    expect(franc(5).equals(franc(6))).toBeFalsy()
    expect(franc(5).equals(dollar(5))).toBeFalsy()
  })
  test('フランの掛け算', () => {
    const five: Money = franc(5)
    expect(five.times(3).equals(franc(15))).toBeTruthy()
    expect(five.times(2).equals(franc(10))).toBeTruthy()
  })
})
