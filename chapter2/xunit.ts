import { strict as assert } from 'assert'

class TestCase {
  constructor(protected name: string) {}

  setUp() {}

  tearDown() {}

  run() {
    const result = new TestResult()
    result.testStarted()
    this.setUp()
    eval(`this.${this.name}()`)
    this.tearDown()
    return result
  }
}

class WasRun extends TestCase {
  public log = ''

  setUp() {
    this.log += 'setUp '
  }

  testMethod() {
    this.log += 'testMethod '
  }

  testBrokenMethod() {
    throw new Error()
  }

  tearDown() {
    this.log += 'tearDown '
  }
}

class TestResult {
  private runCount = 0
  testStarted() {
    this.runCount += 1
  }
  summary() {
    return `${this.runCount} run 0 failed`
  }
}

class TestCaseTest extends TestCase {
  private testObj?: WasRun

  private test(): WasRun {
    if (!this.testObj) {
      throw new Error('setUpが実行される前にtest()が呼ばれた')
    }

    return this.testObj
  }

  testTemplateMethod() {
    const test = new WasRun('testMethod')
    test.run()
    assert(test.log === 'setUp testMethod tearDown ')
  }

  testResult() {
    const test = new WasRun('testMethod')
    const result = test.run()
    assert('1 run 0 failed' === result.summary())
  }

  testFailedResult() {
    const test = new WasRun('testBrokenMethod')
    const result = test.run()
    assert('1 run 1 failed' === result.summary())
  }
}

new TestCaseTest('testTemplateMethod').run()
new TestCaseTest('testResult').run()
// new TestCaseTest('testFailedResult').run()
