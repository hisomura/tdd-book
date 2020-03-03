import Expression from './expression'
import Sum from './sum'

class Money implements Expression {
  constructor(readonly amount: number, protected currencyName: string) {}

  equals(object: object): boolean {
    const money: Money = object as Money
    return this.amount === money.amount && this.currency() === money.currency()
  }

  plus(input: Money): Expression {
    return new Sum(this, input)
  }

  reduce(to: string) {
    return this
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currencyName)
  }

  currency(): string {
    return this.currencyName
  }

  toString(): string {
    return this.amount + ' ' + this.currency()
  }
}

export default Money

export const dollar = (amount: number): Money => {
  return new Money(amount, 'USD')
}

export const franc = (amount: number): Money => {
  return new Money(amount, 'CHF')
}
