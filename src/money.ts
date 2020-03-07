import Expression from './expression'
import Sum from './sum'
import Bank from './bank'

class Money implements Expression {
  constructor(readonly amount: number, protected currencyName: string) {}

  equals(object: object): boolean {
    const money: Money = object as Money
    return this.amount === money.amount && this.currency() === money.currency()
  }

  plus(input: Expression): Expression {
    return new Sum(this, input)
  }

  reduce(bank: Bank, to: string) {
    const rate: number = bank.rate(this.currencyName, to)
    return new Money(this.amount / rate, to)
  }

  times(multiplier: number): Expression {
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
