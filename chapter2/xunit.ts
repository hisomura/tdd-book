import { strict as assert } from 'assert'

class TestCase {
  constructor(protected name: string) {}

  setUp() {}

  tearDown() {}

  run() {
    this.setUp()
    eval(`this.${this.name}()`)
    this.tearDown()
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

  tearDown() {
    this.log += 'tearDown '
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
    console.log(test.log)
    assert(test.log === 'setUp testMethod tearDown ')
  }
}

new TestCaseTest('testTemplateMethod').run()
