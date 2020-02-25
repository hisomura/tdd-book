class Dollar {
  constructor(public amount: number) {}
  times(multiplier: number) {
    return new Dollar(this.amount * multiplier)
  }
  equals(dollar: Dollar): boolean {
    return this.amount === dollar.amount
  }
}

export default Dollar
