import TestCase from './testCase'

class WasRun extends TestCase {
  public wasRun = false

  constructor(protected name: keyof WasRun) {
    super(name)
  }

  testMethod() {
    this.wasRun = true
  }
}

export default WasRun
