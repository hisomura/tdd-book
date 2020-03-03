import Money from './money'
import Expression from './expression'
class Sum implements Expression {
  constructor(public augend: Money, public addend: Money) {}
  reduce(to: string): Money {
    const amount: number = this.augend.amount + this.addend.amount
    return new Money(amount, to)
  }
}

export default Sum
