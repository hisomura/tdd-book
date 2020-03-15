import { fib } from './fib'

describe('fib()のテスト', () => {
  test('整数でない値を入れるとエラー', () => {
    expect(() => {
      fib(0.5)
    }).toThrow()
  })

  test.each([
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
  ])('%iのとき%iを返す', (input, expected) => {
    expect(fib(input)).toBe(expected)
  })
})
