class Franc {
  constructor(private amount: number) {}
  times(multiplier: number) {
    return new Franc(this.amount * multiplier)
  }
  equals(dollar: Franc): boolean {
    return this.amount === dollar.amount
  }
}

export default Franc
