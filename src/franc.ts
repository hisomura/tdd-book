import Money from './money'

class Franc extends Money {
  times(multiplier: number) {
    return new Franc(this.amount * multiplier)
  }
}

export default Franc
