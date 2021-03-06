import Money from './money'
import Bank from './bank'

interface Expression {
  reduce(bank: Bank, to: string): Money
  plus(input: Expression): Expression
  times(multiplier: number): Expression
  equals(object: object): boolean
}

export default Expression
