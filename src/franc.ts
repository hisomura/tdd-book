import Money, { franc } from './money'

class Franc extends Money {
  times(multiplier: number) {
    return franc(this.amount * multiplier)
  }
}

export default Franc
