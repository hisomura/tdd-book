import Dollar from './dollar'

describe('Dollarクラス', () => {
  test('掛け算', () => {
    const five = new Dollar(5)
    expect(five.times(3).amount).toBe(15)
    expect(five.times(2).amount).toBe(10)
  })
  test('等価', () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy()
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy()
  })
})
