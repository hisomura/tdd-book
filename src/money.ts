abstract class Money {
  constructor(protected amount: number, protected currencyName: string) {
    this.currencyName = currencyName
  }

  equals(object: object): boolean {
    const money: Money = object as Money
    return this.amount === money.amount && this.constructor.name === money.constructor.name
  }

  abstract times(multiplier: number): Money

  currency(): string {
    return this.currencyName
  }
}

export default Money

import Dollar from './dollar'
export const dollar = (amount: number): Money => {
  return new Dollar(amount, 'USD')
}

import Franc from './franc'
export const franc = (amount: number): Money => {
  return new Franc(amount, 'CHF')
}
