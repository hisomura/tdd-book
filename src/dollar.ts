import Money from './money'

class Dollar extends Money {
  times(multiplier: number) {
    return new Dollar(this.amount * multiplier)
  }
}

export default Dollar
