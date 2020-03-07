import Money from './money'
import Expression from './expression'
import Bank from './bank'
class Sum implements Expression {
  constructor(public augend: Money, public addend: Money) {}
  reduce(bank: Bank, to: string): Money {
    const amount: number = this.augend.amount + this.addend.amount
    return new Money(amount, to)
  }
}

export default Sum
