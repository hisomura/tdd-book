import Expression from './expression'
import Money from './money'
import RateMap from './rateMap'

class Bank {
  private rates: RateMap = new RateMap()
  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to)
  }
  addRate(from: string, to: string, rate: number) {
    this.rates.put(from, to, rate)
  }

  rate(from: string, to: string): number {
    if (from === to) return 1

    const rate = this.rates.get(from, to)
    if (!rate) {
      throw new Error(`${from} to ${to} rate not defined`)
    }
    return rate
  }
}

export default Bank
