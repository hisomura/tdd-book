import { strict as assert } from 'assert'

class TestCase {
  constructor(protected name: string) {}

  setUp() {}

  tearDown() {}

  run(result: TestResult) {
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

class TestSuite {
  private tests: TestCase[] = []
  add(test: TestCase) {
    this.tests.push(test)
  }
  run(result: TestResult) {
    for (const test of this.tests) {
      test.run(result)
    }
    return result
  }
}

class TestCaseTest extends TestCase {
  private result?: TestResult

  private getResult(): TestResult {
    if (!this.result) {
      throw new Error('setUpが実行される前にtest()が呼ばれた')
    }

    return this.result
  }

  setUp() {
    super.setUp()
    this.result = new TestResult()
  }

  testTemplateMethod() {
    const test = new WasRun('testMethod')
    test.run(this.getResult())
    assert(test.log === 'setUp testMethod tearDown ')
  }

  testResult() {
    const test = new WasRun('testMethod')
    test.run(this.getResult())
    assert('1 run 0 failed' === this.getResult().summary())
  }

  testFailedResult() {
    const test = new WasRun('testBrokenMethod')
    test.run(this.getResult())
    assert('1 run 1 failed' === this.getResult().summary())
  }

  testFailedResultFormatting() {
    this.getResult().testStarted()
    this.getResult().testFailed()
    assert('1 run 1 failed' === this.getResult().summary())
  }

  testSuite() {
    const suite = new TestSuite()
    suite.add(new WasRun('testMethod'))
    suite.add(new WasRun('testBrokenMethod'))
    suite.run(this.getResult())
    assert('2 run 1 failed' === this.getResult().summary())
  }
}

const suite = new TestSuite()
suite.add(new TestCaseTest('testTemplateMethod'))
suite.add(new TestCaseTest('testResult'))
suite.add(new TestCaseTest('testFailedResult'))
suite.add(new TestCaseTest('testFailedResultFormatting'))
suite.add(new TestCaseTest('testSuite'))
const result = new TestResult()
suite.run(result)
console.log(result.summary())
