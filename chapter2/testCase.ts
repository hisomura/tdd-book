class TestCase {
  constructor(protected name: string) {}

  hasMember(name: string): name is keyof TestCase {
    return this.name in this
  }

  run() {
    if (!this.hasMember(this.name)) {
      throw new Error(`${this.constructor.name}に${this.name}は存在しない`)
    }
    // とりあえず型の警告が出ないようにした
    // methodの型はhasMember()かrun()のものになっててこれで良いのかという気がする
    const method = this[this.name]
    if (!isCallable(method)) {
      throw new Error(`${this.name}はcallableではない`)
    }
    method.call(this)
  }
}

function isCallable(x: any): x is (y: any) => void {
  return typeof x === 'function'
}

export default TestCase
