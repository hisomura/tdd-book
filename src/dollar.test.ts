import Dollar from './dollar'
import Franc from './franc'

describe('通貨', () => {
  test('ドルの掛け算', () => {
    const five = new Dollar(5)
    expect(five.times(3).equals(new Dollar(15))).toBeTruthy()
    expect(five.times(2).equals(new Dollar(10))).toBeTruthy()
  })
  test('ドルの等価', () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy()
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy()
  })
  test('フランの掛け算', () => {
    const five = new Franc(5)
    expect(five.times(3).equals(new Franc(15))).toBeTruthy()
    expect(five.times(2).equals(new Franc(10))).toBeTruthy()
  })
})
