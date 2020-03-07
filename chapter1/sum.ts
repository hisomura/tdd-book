import Money from './money'
import Expression from './expression'
import Bank from './bank'
class Sum implements Expression {
  constructor(public augend: Expression, public addend: Expression) {}
  reduce(bank: Bank, to: string): Money {
    const amount: number = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount
    return new Money(amount, to)
  }
  plus(input: Expression): Expression {
    return new Sum(this, input)
  }

  times(multiplier: number): Expression {
    return new Sum(this.augend.times(multiplier), this.augend.times(multiplier))
  }

  equals(object: object): boolean {
    return object instanceof Sum && this.augend === object.augend && this.addend === object.addend
  }
}

export default Sum
