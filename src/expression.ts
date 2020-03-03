import Money from './money'

interface Expression {
  reduce(to: string): Money
}

export default Expression
