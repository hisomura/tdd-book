import { strict as assert } from 'assert'

class TestCase {
  constructor(protected name: string) {}

  setUp() {}

  run() {
    this.setUp()
    eval(`this.${this.name}()`)
  }
}

class WasRun extends TestCase {
  public wasRun = false
  public wasSetUp = false

  setUp() {
    this.wasSetUp = true
  }

  testMethod() {
    this.wasRun = true
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

  setUp() {
    this.testObj = new WasRun('testMethod')
  }

  testRunning() {
    this.test().run()
    assert(this.test().wasRun)
  }

  testSetup() {
    this.test().run()
    assert(this.test().wasSetUp)
  }
}

new TestCaseTest('testRunning').run()
new TestCaseTest('testSetup').run()
