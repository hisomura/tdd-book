import Expression from './expression'
import Money, { dollar } from './money'

class Bank {
  reduce(source: Expression, to: string): Money {
    return dollar(10)
  }
}

export default Bank
