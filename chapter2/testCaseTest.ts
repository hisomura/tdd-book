import TestCase from './testCase'
import WasRun from './wasRun'
import { strict as assert } from 'assert'

class TestCaseTest extends TestCase {
  testRunning() {
    const test = new WasRun('testMethod')
    assert(!test.wasRun, 'error')
    test.run()
    assert(test.wasRun)
  }
}

new TestCaseTest('testRunning').run()
