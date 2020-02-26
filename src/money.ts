class Money {
  constructor(protected amount: number) {}

  equals(object: object): boolean {
    const money: Money = object as Money
    return this.amount === money.amount && this.constructor.name === money.constructor.name
  }
}

export default Money
