export const fib = (x: number): number => {
  if (!Number.isInteger(x)) {
    throw new Error('整数でない値が入力された')
  }

  if (x === 0) return 0
  if (x === 1) return 1
  return fib(x - 1) + fib(x - 2)
}
