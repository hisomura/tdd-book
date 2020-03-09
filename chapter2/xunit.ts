import { strict as assert } from 'assert'

class TestCase {
  constructor(protected name: string) {}

  setUp() {}

  tearDown() {}

  run() {
    const result = new TestResult()
    result.testStarted()
    this.setUp()
    try {
      eval(`this.${this.name}()`)
    } catch (e) {
      result.testFailed()
    }
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
  private errorCount = 0
  testStarted() {
    this.runCount += 1
  }
  testFailed() {
    this.errorCount += 1
  }
  summary() {
    return `${this.runCount} run ${this.errorCount} failed`
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

  testFailedResultFormatting() {
    const result = new TestResult()
    result.testStarted()
    result.testFailed()
    assert('1 run 1 failed' === result.summary())
  }
}

console.log(new TestCaseTest('testTemplateMethod').run().summary())
console.log(new TestCaseTest('testResult').run().summary())
console.log(new TestCaseTest('testFailedResult').run().summary())
console.log(new TestCaseTest('testFailedResultFormatting').run().summary())
