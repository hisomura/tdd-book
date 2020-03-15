type TriangleType = 1 | 2 | 3

export const getTriangleType = (a: number, b: number, c: number): TriangleType => {
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error('0または負の値が入力された')
  }
  if (!(a < b + c && b < a + c && c < a + b)) {
    throw new Error('入力された値が三角形の条件を満たしていない')
  }

  if (a === b && b === c && c === a) {
    return 1
  }

  if (a === b || b === c || c === a) {
    return 2
  }

  return 3
}
