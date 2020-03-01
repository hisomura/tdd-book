class Money {
  constructor(protected amount: number, protected currencyName: string) {}

  equals(object: object): boolean {
    const money: Money = object as Money
    return this.amount === money.amount && this.currency() === money.currency()
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
