class RateMap {
  private currencyRate: Map<string, number> = new Map<string, number>()

  put(from: string, to: string, rate: number) {
    this.currencyRate.set(this.generateMapKey(from, to), rate)
  }

  get(from: string, to: string): number | undefined {
    return this.currencyRate.get(this.generateMapKey(from, to))
  }

  protected generateMapKey(from: string, to: string): string {
    return `${from}_${to}`
  }
}

export default RateMap
