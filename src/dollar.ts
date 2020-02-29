import Money, { dollar } from './money'

class Dollar extends Money {
  times(multiplier: number) {
    return dollar(this.amount * multiplier)
  }
}

export default Dollar
