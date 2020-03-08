class WasRun {
  public wasRun = false

  constructor(private name: keyof WasRun) {}

  testMethod() {
    this.wasRun = true
  }

  run() {
    if (!(this.name in this)) {
      throw new Error(`${this.constructor.name}に${this.name}は存在しない`)
    }

    const method = this[this.name]
    if (isCallable(method)) {
      method.call(this)
    }
  }
}

function isCallable(x: any): x is (y: any) => void {
  return typeof x === 'function'
}

export default WasRun
