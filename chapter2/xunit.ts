import { strict as assert } from 'assert'

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

class WasRun extends TestCase {
  public wasRun = false

  constructor(protected name: keyof WasRun) {
    super(name)
  }

  testMethod() {
    this.wasRun = true
  }
}

class TestCaseTest extends TestCase {
  testRunning() {
    const test = new WasRun('testMethod')
    assert(!test.wasRun, 'error')
    test.run()
    assert(test.wasRun)
  }
}

function isCallable(x: any): x is (y: any) => void {
  return typeof x === 'function'
}

new TestCaseTest('testRunning').run()
const test = new WasRun('testMethod')
console.log(test.wasRun)
test.run()
console.log(test.wasRun)
