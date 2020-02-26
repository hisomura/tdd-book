import Money from './money'

class Dollar extends Money {
  times(multiplier: number) {
    return new Dollar(this.amount * multiplier)
  }
  equals(object: object): boolean {
    const money: Money = object as Money
    return this.amount === money.amount
  }
}

export default Dollar
