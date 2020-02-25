import Dollar from './dollar'

describe('Dollarクラス', () => {
  test('掛け算', () => {
    const five = new Dollar(5)
    expect(five.times(3).amount).toBe(15)
    expect(five.times(2).amount).toBe(10)
  })
})
