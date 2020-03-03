import Expression from './expression'
import Money from './money'

class Bank {
  reduce(source: Expression, to: string): Money {
    return source.reduce(to)
  }
}

export default Bank
