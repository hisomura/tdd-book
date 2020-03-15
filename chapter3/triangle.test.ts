import { getTriangleType } from './triangle'

describe('三角形のテスト', () => {
  test('0が入力された場合に例外', () => {
    expect(() => {
      getTriangleType(0, 1, 3)
    }).toThrow()
    expect(() => {
      getTriangleType(3, 0, 1)
    }).toThrow()
    expect(() => {
      getTriangleType(1, 3, 0)
    }).toThrow()
  })
  test('負の値が入力された場合に例外', () => {
    expect(() => {
      getTriangleType(-1, 1, 3)
    }).toThrow()
    expect(() => {
      getTriangleType(3, -1, 1)
    }).toThrow()
    expect(() => {
      getTriangleType(1, 3, -1)
    }).toThrow()
  })
  test('三角形じゃない値が入力された場合に例外', () => {
    expect(() => {
      getTriangleType(100, 1, 2)
    }).toThrow()
  })
  test('正三角形の時に1を返す', () => {
    expect(getTriangleType(1, 1, 1)).toBe(1)
  })
  test('二等辺三角形の時に2を返す', () => {
    expect(getTriangleType(2, 2, 3)).toBe(2)
  })
  test('不当辺三角形の時に3を返す', () => {
    expect(getTriangleType(3, 4, 5)).toBe(3)
  })
})
