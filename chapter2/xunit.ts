import { strict as assert } from 'assert'

class TestCase {
  constructor(protected name: string) {}

  run() {
    eval(`this.${this.name}()`)
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

new TestCaseTest('testRunning').run()
const test = new WasRun('testMethod')
console.log(test.wasRun)
test.run()
console.log(test.wasRun)
